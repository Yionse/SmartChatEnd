import { User } from '@/entities/User.entities';
import { HobbyList } from '@/entities/HobbyList.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { UserInfo } from '@/entities/Userinfo.entities';

export function getEmailCode() {
  const min = 100000; // 最小值为100000
  const max = 999999; // 最大值为999999
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(HobbyList)
    private readonly hobbyRepository: Repository<HobbyList>,
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
  ) {}

  async fetchLogin(
    qq: string,
    code: string,
    sendTime: string,
  ): Promise<string> {
    const userList = await this.userRepository.findOne({ where: { qq, code } });
    if (userList) {
      // 找到了，再对比时间戳，看看是否过期了
      if ((Number(sendTime) - Number(userList.sendTime)) / 1000 > 60) {
        // 失效了
        return '';
      } else {
        // 没失效
        return this.generateToken(qq);
      }
    } else {
      // 不存在该用户
      return '';
    }
  }

  async getSendEmailCode(qq: string): Promise<void> {
    const userList = await this.userRepository.findOne({ where: { qq } });
    // 开发环境下，直接设置为123123
    if (userList) {
      userList.code = '123123';
      userList.sendTime = +new Date() + '';
      await this.userRepository.save(userList);
    } else {
      const user = new User();
      user.code = '123123';
      user.qq = qq;
      user.sendTime = +new Date() + '';
      await this.userRepository.save(user);
    }
  }

  generateToken(payload: any): string {
    return jwt.sign({ user: payload }, process.env.SECRETKEY, {
      expiresIn: process.env.EXPIRESIN,
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.SECRETKEY);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async findUser(qq: string) {
    return await this.userInfoRepository.findOne({ where: { qq } });
  }

  async getHobbyList() {
    return await this.hobbyRepository.find({});
  }

  async setUserInfo(info: UserInfo) {
    const userInfo = new UserInfo();
    Object.assign(userInfo, info);
    this.userInfoRepository.save(userInfo);
  }

  async updateLocation(location: string, qq: string) {
    // 找到该用户，更新IP
    const userInfo = await this.findUser(qq);
    userInfo.location = location;
    await this.userInfoRepository.save(userInfo);
  }
}
