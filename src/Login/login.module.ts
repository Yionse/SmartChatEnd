import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { Userinfo } from 'src/entities/Userinfo.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Userinfo])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
