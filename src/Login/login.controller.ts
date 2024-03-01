import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly appService: LoginService) {}

  @Post('lg')
  async login(
    @Body()
    { qq, code, sendTime }: { qq: string; code: string; sendTime: string },
    @Res() res: Response,
  ): Promise<void> {
    const token = await this.appService.fetchLogin(qq, code, sendTime);
    res.customerSend(`登录${token ? '成功' : '失败'}`, HttpStatus.OK, {
      token,
    });
  }

  @Get('/send')
  async sendCode(
    @Query() { qq }: { qq: string },
    @Res() res: Response,
  ): Promise<void> {
    await this.appService.getSendEmailCode(qq);
    res.customerSend('发送验证码成功', HttpStatus.OK, {});
  }
}
