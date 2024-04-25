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
  // 状态：不可添加(待同意-已是好友-待验证) 可添加(已被拒绝)
  // 展示的文字：对应不可添加(待同意-null-去验证)
  // from当前搜索用户
  async isAddContact(from: string, target: string) {
    let text = '';
    const correlation = await this.contactRepository.find({
      where: [
        { from, target },
        { from: target, target: from },
      ],
    });
    const isAdd =
      correlation.length === 0 ||
      correlation.every((item) => item.status === -1);
    if (!isAdd) {
      if (correlation?.[0].status === 1) {
        text = '';
      } else if (correlation?.[0].from === from) {
        text = '待同意';
      } else if (correlation?.[0].target === from) {
        text = '去验证';
      }
    }
    return { isAdd, text, id: correlation?.[0]?.id };
  }

  async getRecommendList(user: string) {
    const list = await this.userInfoRepository.find();
    const me = list.find((item) => item.qq === user);
    const filterUser = list.filter((item) => item.qq !== user);
    const meHobbyList = me.hobbyList.split('-') || [];
    const arr: UserInfo[] = [];
    // 将相同爱好筛选出来
    for (const item of filterUser) {
      let isPush = false;
      meHobbyList.forEach((hobby) => {
        if (item.hobbyList.includes(hobby)) {
          isPush = true;
          return;
        }
      });
      if (isPush && (await this.isAddContact(user, item.qq)).isAdd) {
        item['isAdd'] = await this.isAddContact(user, item.qq);
        arr.push(item);
      }
    }
    return arr.slice(0, 5);
  }

  async searchUser(key: string, from: string) {
    const list = await this.userInfoRepository
      .createQueryBuilder('user')
      .where('user.qq LIKE :key', { key: `%${key}%` })
      .orWhere('user.userName LIKE :key', { key: `%${key}%` })
      .orWhere('user.hobbyList LIKE :key', { key: `%${key}%` })
      .getMany();
    for (const item of list) {
      item['isAdd'] = await this.isAddContact(from, item.qq);
    }
    return list.filter((item) => item.qq !== from);
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
    return verifyList;
  }

  // 获取某个人的所有联系人
  async getContactList(user: string) {
    const userList = await this.userInfoRepository.find();
    const list = await this.contactRepository.find({
      where: [{ from: user }, { target: user }],
    });
    return list
      .filter((item) => item.status === 1)
      .map((item) => {
        let key = '';
        let remark = '';
        if (item.from === user) {
          key = 'from';
          remark = item.fromRemark;
        } else {
          key = 'target';
          remark = item.targetRemark;
        }
        item['userInfo'] = userList.find(
          (userInfo) => userInfo.qq === item[key],
        );
        item['remark'] = remark;
        return item;
      });
  }
}
