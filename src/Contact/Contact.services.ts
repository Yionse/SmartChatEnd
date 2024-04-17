import { Contact } from '@/entities/ContactShip.entities';
import { UserInfo } from '@/entities/Userinfo.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactServices {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async getRecommendList(user: string) {
    const list = await this.userInfoRepository.find();
    const me = list.find((item) => item.qq === user);
    const filterUser = list.filter((item) => item.qq !== user);
    const meHobbyList = me.hobbyList.split('-') || [];
    const arr: UserInfo[] = [];
    filterUser.forEach((item) => {
      let isPush = false;
      meHobbyList.forEach((hobby) => {
        if (item.hobbyList.includes(hobby)) {
          isPush = true;
          return;
        }
      });
      if (isPush) {
        arr.push(item);
      }
    });
    return arr.slice(0, 5);
  }

  async searchUser(key: string) {
    return await this.userInfoRepository
      .createQueryBuilder('user')
      .where('user.qq LIKE :key', { key: `%${key}%` })
      .orWhere('user.userName LIKE :key', { key: `%${key}%` })
      .orWhere('user.hobbyList LIKE :key', { key: `%${key}%` })
      .getMany();
  }

  async requestAdd(contact: Contact) {
    await this.contactRepository.save(contact);
  }

  // 获取和某个人先关的所有好友申请
  async getVerifyList(target: string) {
    const verifyList = await this.contactRepository.find({
      where: [{ target }, { from: target }],
    });
    const userInfoList = await this.userInfoRepository.find();
    verifyList.forEach((verifyItem) => {
      const key = verifyItem.from === target ? 'target' : 'from'; //  我主动加
      verifyItem['userInfo'] = userInfoList.find(
        (userInfo) => userInfo.qq === verifyItem[key],
      );
    });
    return verifyList.filter((verify) => verify.status !== 1);
  }
}
