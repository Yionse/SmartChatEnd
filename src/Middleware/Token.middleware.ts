// token.service.ts

import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: process.env.EXPIRESIN,
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.SECRETKEY);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
