import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { NewUserDto } from "./user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('signup')
    async signup(@Body() newUser: NewUserDto) {
        return await this.userService.signup(newUser);
    }
}