import { Forum } from '@/entities/Forum.entities';
import { UserInfo } from '@/entities/Userinfo.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ForumServices {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}
  async create(data: Forum) {
    await this.forumRepository.save(data);
  }

  async personalList(user: string) {
    let query: { userInfo: {}; chat: {} } = {} as any;
    if (user) {
      query.userInfo = { qq: user };
      query.chat = { user };
    }
    const userInfo = await this.userRepository.find({ where: query.userInfo });
    const list = await this.forumRepository.find({ where: query.chat });
    list.sort((pre, next) => {
      return Number(next.createTime) - Number(pre.createTime);
    });
    list.forEach((forum) => {
      forum['userInfo'] = userInfo.find((user) => user.qq === forum.user);
    });
    return list;
  }
}
