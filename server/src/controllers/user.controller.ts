import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "src/services/user.service";
import { User } from "src/schemas/user.schema";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('signup')
    async signup(@Body() user: User) {
        return await this.userService.create(user);
    }

}