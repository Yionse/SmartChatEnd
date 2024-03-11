import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { LoginModule } from './Login/login.module';
import { User } from './entities/User.entities';
import { UserInfo } from './entities/Userinfo.entities';
import { ResponseMiddleware } from './Middleware/Response.middleware';
import { HobbyList } from './entities/HobbyList.entities';

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
      entities: [User, UserInfo, HobbyList],
    }),
    LoginModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('/');
  }
}
