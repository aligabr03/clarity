import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto } from './auth.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authData: LoginDto) {
    const user = await this.validateUser(authData.username, authData.password);
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) throw new UnauthorizedException('Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('Invalid username or password');

    return {
      id: user._id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
    };
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
