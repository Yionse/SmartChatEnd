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
    res.customerSend('发起好友申请', HttpStatus.OK, {});
  }

  @Get('verifyList')
  async getNumber(
    @Query() { target }: { target: string },
    @Res() res: Response,
  ) {
    const list = await this.service.getVerifyList(target);
    res.customerSend('好友申请列表', HttpStatus.OK, list);
  }

  @Post('verify')
  async verify(
    @Body()
    {
      from,
      status,
      targetRemark,
    }: {
      from: string;
      status: number;
      targetRemark?: string;
    },
  ) {}
}
