import { Forum } from '@/entities/Forum.entities';
import { ForumComment } from '@/entities/ForumComment.entities';
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
    @InjectRepository(ForumComment)
    private readonly commentRepository: Repository<ForumComment>,
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
    const commentList = await this.commentRepository.find();
    list.sort((pre, next) => {
      return Number(next.createTime) - Number(pre.createTime);
    });
    list.forEach((forum) => {
      const { userImg, userName, qq } = userInfo.find(
        (user) => user.qq === forum.user,
      );
      forum['userImg'] = userImg;
      forum['userName'] = userName;
      forum['userId'] = qq;
      const comment = commentList.filter(
        (comment) => comment.forumId === Number(forum.id),
      );
      comment.forEach((newComment) => {
        const { userImg, userName, qq } = userInfo.find(
          (user) => Number(user.qq) === newComment.userId,
        );
        newComment['userImg'] = userImg;
        newComment['userName'] = userName;
      });
      forum['commentList'] = comment;
    });
    return list;
  }

  async createComment(forumComment: ForumComment) {
    await this.commentRepository.save(forumComment);
  }
}
