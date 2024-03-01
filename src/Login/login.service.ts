import { User } from '@/entities/user.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

export function getEmailCode() {
  const min = 100000; // 最小值为100000
  const max = 999999; // 最大值为999999
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
    if (userList) {
      userList.code = getEmailCode() + '';
      userList.sendTime = +new Date() + '';
      await this.userRepository.save(userList);
    } else {
      const user = new User();
      user.code = getEmailCode() + '';
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
}
