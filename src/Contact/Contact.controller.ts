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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginService } from '@/Login/login.service';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly service: ContactServices,
    private readonly userInfoService: LoginService,
    @InjectRepository(Contact) private readonly repository: Repository<Contact>,
  ) {}

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
  async searchUser(
    @Query() { key, from }: { key: string; from: string },
    @Res() res: Response,
  ) {
    res.customerSend(
      '搜索成功',
      HttpStatus.OK,
      await this.service.searchUser(key, from),
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

  // 好友申请状态变更
  @Post('verify')
  async verify(
    @Body()
    {
      id,
      status,
      targetRemark,
    }: {
      id: number;
      status: number;
      targetRemark?: string;
    },
    @Res() res: Response,
  ) {
    const verifyItem = await this.repository.findOne({ where: { id } });
    Object.assign(verifyItem, { status, targetRemark });
    await this.repository.save(verifyItem);
    res.customerSend('操作成功', HttpStatus.OK, {});
  }

  @Get('list')
  async getContactList(@Query() { qq }: { qq: string }, @Res() res: Response) {
    res.customerSend(
      '查询联系人列表成功',
      HttpStatus.OK,
      await this.service.getContactList(qq),
    );
  }

  @Get('detail')
  async getDetail(@Query() { qq }: { qq: string }, @Res() res: Response) {
    res.customerSend(
      '查询联系人详情成功',
      HttpStatus.OK,
      await this.userInfoService.findUser(qq),
    );
  }
}
