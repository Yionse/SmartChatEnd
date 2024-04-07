import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/entities/User.entities';
import { UserInfo } from '@/entities/Userinfo.entities';
import { ForumController } from './Forum.controller';
import { ForumServices } from './Forum.services';
import { Forum } from '@/entities/Forum.entities';
import { ForumComment } from '@/entities/ForumComment.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo, Forum, ForumComment])],
  controllers: [ForumController],
  providers: [ForumServices],
})
export class ForumModule {}
