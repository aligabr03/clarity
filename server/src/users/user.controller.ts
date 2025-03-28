import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { User } from "src/users/user.schema";
import { NewUserDto } from "./dto/new-user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('signup')
    async signup(@Body() newUser: NewUserDto) {
        console.log(newUser);
        return await this.userService.signup(newUser);
    }

}