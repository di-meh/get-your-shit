import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class VerifyEmailDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    hash: string;
}