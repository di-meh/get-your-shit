import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class ForgotPasswordDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  email: string;
}
