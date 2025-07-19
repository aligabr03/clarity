import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authData: LoginDto) {
    return this.authService.login(authData);
  }

  @Post('signup')
  async signup(@Body() newUser: RegisterDto) {
    return await this.authService.register(newUser);
  }
}
