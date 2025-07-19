import { Body, Controller, Post, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshTokenDto } from './auth.dto';
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { parseTimeToMs } from 'src/utils/time.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() newUser: RegisterDto) {
    return await this.authService.register(newUser);
  }

  @Post('login')
  async login(@Body() authData: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(authData);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: parseTimeToMs(process.env.JWT_REFRESH_EXPIRATION),
    });

    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const result = await this.authService.refreshToken({ refreshToken });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: parseTimeToMs(process.env.JWT_REFRESH_EXPIRATION),
    });

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    console.log('Logging out user:', req.user.username);
    await this.authService.logout(req.user.id);

    res.clearCookie('refreshToken');

    return { message: 'Logged out successfully' };
  }
}
