import {
    IsDefined,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
    IsUUID,
  } from 'class-validator';
  
  export class CreateRestaurantDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    address: string;
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phone: string;
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsPostalCode('FR')
    postal_code: string;
  
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    ownerId: string;
  }
  