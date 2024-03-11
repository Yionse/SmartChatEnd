import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { HobbyList } from '@/entities/HobbyList.entities';
import { User } from '@/entities/User.entities';
import { UserInfo } from '@/entities/Userinfo.entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo, HobbyList])],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
