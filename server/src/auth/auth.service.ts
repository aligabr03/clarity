import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto, RefreshTokenDto } from './auth.dto';
import { UnauthorizedException, BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(credentials: LoginDto) {
    const user = await this.validateCredentials(credentials.username, credentials.password);
    const payload = { id: user.id, username: user.username };

    const accessToken = await this.generateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);

    await this.userModel.findByIdAndUpdate(user.id, { refreshToken });

    return {
      accessToken,
      refreshToken, // This will be used by controller to set cookie
      user: {
        id: user.id,
        username: user.username,
        fname: user.fname,
        lname: user.lname,
      },
    };
  }

  private async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });
  }

  private async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    });
  }

  async validateCredentials(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid username or password');

    return {
      id: user._id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret:
          this.configService.get<string>('JWT_REFRESH_SECRET') ||
          this.configService.get<string>('JWT_SECRET'),
      });

      // Find user with this refresh token
      const user = await this.userModel
        .findOne({
          _id: payload.id,
          refreshToken,
        })
        .exec();

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const newPayload = { id: user._id, username: user.username };
      const newAccessToken = await this.generateAccessToken(newPayload);
      const newRefreshToken = await this.generateRefreshToken(newPayload);

      // Update refresh token in database
      await this.userModel.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // Remove refresh token from database
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
    return { message: 'Logged out successfully' };
  }

  async register(newUser: RegisterDto): Promise<User> {
    const { fname, lname, username, password, dob } = newUser;
    const user = new this.userModel({
      fname,
      lname,
      username,
      password,
      dob,
    });
    return user.save();
  }
}
