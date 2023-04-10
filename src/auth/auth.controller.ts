import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    const { username } = body;

    // ... logic to authenticate user ...

    const token = this.authService.generateToken({ username });

    return { token };
  }
}
