import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsPostalCode,
  IsOptional,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;

  @IsString()
  @IsStrongPassword()
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('FR')
  @IsOptional()
  postal_code?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date_birth?: string | Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  departement?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  vehicule_type?: string;
}
