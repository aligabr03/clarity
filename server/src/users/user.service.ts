import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/users/user.schema";
import { Model } from "mongoose";
import { NewUserDto } from "./dto/new-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async signup(newUser: NewUserDto): Promise<User> {
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