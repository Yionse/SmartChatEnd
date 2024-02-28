import { Module } from '@nestjs/common';
import { LoginController } from './Login/login.controller';
import { LoginService } from './Login/login.service';

@Module({
  imports: [],
  controllers: [LoginController],
  providers: [LoginService],
})
export class AppModule {}
