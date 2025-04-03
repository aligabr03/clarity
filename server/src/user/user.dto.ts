import { IsString, IsNotEmpty, IsDate, MinLength, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class NewUserDto {
    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
    password: string;

    @IsDate()
    @Type(() => Date)
    dob: Date;
}