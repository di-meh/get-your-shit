import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateRestaurantDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  address: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsPhoneNumber('FR')
  @IsOptional()
  phone: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsPostalCode('FR')
  @IsOptional()
  postal_code: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  ownerId: string;
}
