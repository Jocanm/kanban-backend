import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";


export class LoginUserDto {

    @IsEmail()
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

}