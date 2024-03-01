import { Module } from '@nestjs/common';
import { LoginController } from './Login/login.controller';
import { LoginService } from './Login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { LoginModule } from './Login/login.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: process.env.PORT,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: `${process.env.DATABASE}`,
      entities: [],
    }),
    LoginModule,
  ],
})
export class AppModule {}
