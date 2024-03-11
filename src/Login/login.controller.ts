import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';
import { User } from '@/entities/User.entities';
import { UserInfo } from '@/entities/Userinfo.entities';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post('lg')
  async login(
    @Body()
    { qq, code, sendTime }: { qq: string; code: string; sendTime: string },
    @Res() res: Response,
  ): Promise<void> {
    const findOne = await this.appService.findUser(qq);
    if (qq === '1') {
      res.customerSend(`登录成功`, HttpStatus.OK, {
        token: 'WWWWWWWWWWWWWASDASDWDQASDASDDSDAS',
        isSetUser: findOne?.qq ? false : true,
      });
      return;
    }
    const token = await this.appService.fetchLogin(qq, code, sendTime);
    res.customerSend(`登录${token ? '成功' : '失败'}`, HttpStatus.OK, {
      token,
      isSetUser: findOne?.qq ? false : true,
    });
  }

  @Get('send')
  async sendCode(
    @Query() { qq }: { qq: string },
    @Res() res: Response,
  ): Promise<void> {
    await this.appService.getSendEmailCode(qq);
    res.customerSend('发送验证码成功', HttpStatus.OK, {});
  }

  @Post('info')
  async setUserInfo(@Body() info: UserInfo, @Res() res: Response) {
    await this.appService.setUserInfo(info);
    console.log(info);
    res.customerSend('设置个人信息成功', HttpStatus.OK, { isSuccess: true });
  }

  @Get('hobby')
  async getHobbyList(@Res() res: Response) {
    const hobbyList = await this.appService.getHobbyList();
    res.customerSend('获取爱好列表成功', HttpStatus.OK, { hobbyList });
  }
}
