import { UserInfo } from '@/entities/Userinfo.entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './Contact.controller';
import { ContactServices } from './Contact.services';
import { Contact } from '@/entities/ContactShip.entities';
import { LoginService } from '@/Login/login.service';
import { HobbyList } from '@/entities/HobbyList.entities';
import { User } from '@/entities/User.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, UserInfo, HobbyList, User])],
  providers: [ContactServices, LoginService],
  controllers: [ContactController],
})
export class ContactModule {}
