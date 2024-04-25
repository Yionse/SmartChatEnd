import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

declare module 'express' {
  interface Response {
    customerSend(message: string, code: HttpStatus, data: any): void;
  }
}

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(_: any, res: Response, next: (error?: any) => void) {
    res.customerSend = function (
      message: string,
      code: HttpStatus,
      data?: any,
    ) {
      res.send({
        message,
        code,
        result: data || {},
      });
    };
    next();
  }
}
