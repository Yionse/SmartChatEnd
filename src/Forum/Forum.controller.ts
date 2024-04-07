import { Forum } from '@/entities/Forum.entities';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ForumServices } from './Forum.services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForumComment } from '@/entities/ForumComment.entities';

@Controller('forum')
export class ForumController {
  constructor(
    private readonly appServices: ForumServices,
    @InjectRepository(Forum) private readonly repository: Repository<Forum>,
  ) {}

  @Post('create')
  async createChat(@Body() chatData: Forum, @Res() res: Response) {
    this.appServices.create(chatData);
    res.customerSend('发布成功', HttpStatus.OK, {});
  }

  @Get('list')
  async chatList(@Query() { user }: { user: string }, @Res() res: Response) {
    res.customerSend(
      '查询成功',
      HttpStatus.OK,
      await this.appServices.personalList(user || ''),
    );
  }

  @Post('comment')
  async createComment(
    @Body() forumComment: ForumComment,
    @Res() res: Response,
  ) {
    await this.appServices.createComment(forumComment);
    res.customerSend('发布评论成功', HttpStatus.OK, {});
  }
}
