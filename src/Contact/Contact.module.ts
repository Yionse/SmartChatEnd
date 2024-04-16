import { UserInfo } from '@/entities/Userinfo.entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './Contact.controller';
import { ContactServices } from './Contact.services';
import { Contact } from '@/entities/ContactShip.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, UserInfo])],
  providers: [ContactServices],
  controllers: [ContactController],
})
export class ContactModule {}
