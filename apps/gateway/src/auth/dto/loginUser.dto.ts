import {IsDefined, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}