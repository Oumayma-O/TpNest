import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly secretKey = 'mySecretKey';

  generateToken(payload: any): string {
    return jwt.sign(payload, this.secretKey);
  }
}
