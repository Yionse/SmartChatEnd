import { ContactShip } from '@/entities/ContactShip.entities';
import { UserInfo } from '@/entities/Userinfo.entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './Contact.controller';
import { ContactServices } from './Contact.services';

@Module({
  imports: [TypeOrmModule.forFeature([ContactShip, UserInfo])],
  providers: [ContactServices],
  controllers: [ContactController],
})
export class ContactModule {}
