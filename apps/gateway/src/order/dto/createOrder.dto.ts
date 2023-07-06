import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  buyerId: string;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  deliveryId: string;

  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;
}
