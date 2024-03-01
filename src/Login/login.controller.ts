import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { User } from '../entities/user.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

function getEmailCode() {
  const min = 100000; // 最小值为100000
  const max = 999999; // 最大值为999999
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Controller('login')
export class LoginController {
  constructor(
    private readonly appService: LoginService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Post('/lg')
  login(): string {
    return this.appService.getHello();
  }

  @Get('/send')
  sendCode(@Body() qq: string): void {
    const user = new User();
    user.code = getEmailCode() + '';
    user.qq = qq;
    user.sendTime = +new Date() + '';
    this.userRepository.save(user);
  }
}
