import {
  IsHash,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsHash('sha256')
  hash: string;
}
