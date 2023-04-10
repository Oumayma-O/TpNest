import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Auth token missing' });
    }

    try {
      const decodedToken: any = verify(authHeader.toString(), 'mySecretKey');
      req['userId'] = decodedToken.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid auth token' });
    }
  }
}
