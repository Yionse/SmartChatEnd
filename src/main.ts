import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // 配置Https服务，如不需要可省略
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '../chat.zhangtc.online.key')),
    cert: fs.readFileSync(
      path.join(__dirname, '../chat.zhangtc.online_bundle.crt'),
    ),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(9901);
}
bootstrap();
