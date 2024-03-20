import { Forum } from '@/entities/Forum.entities';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ForumServices } from './Forum.services';

@Controller('forum')
export class ForumController {
  constructor(private readonly appServices: ForumServices) {}

  @Post('create')
  async createChat(@Body() chatData: Forum, @Res() res: Response) {
    this.appServices.create(chatData);
    res.customerSend('发布成功', HttpStatus.OK, {});
  }
}
