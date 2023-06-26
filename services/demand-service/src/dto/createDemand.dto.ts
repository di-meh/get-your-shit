import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDemandDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('FR')
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsPhoneNumber('FR')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
