import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ContactServices } from './Contact.services';
import { Response } from 'express';
import { Contact } from '@/entities/ContactShip.entities';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactServices) {}

  @Post('recommend')
  async getRecommendList(
    @Body() { user }: { user: string },
    @Res() res: Response,
  ) {
    res.customerSend(
      '获取推荐列表成功',
      HttpStatus.OK,
      await this.service.getRecommendList(user),
    );
  }

  @Get('search')
  async searchUser(@Query() { key }: { key: string }, @Res() res: Response) {
    res.customerSend(
      '搜索成功',
      HttpStatus.OK,
      await this.service.searchUser(key),
    );
  }

  @Post('request')
  async request(@Body() contact: Contact, @Res() res: Response) {
    await this.service.requestAdd(contact);
    // res.customerSend('添加好友成功', )
  }
}
