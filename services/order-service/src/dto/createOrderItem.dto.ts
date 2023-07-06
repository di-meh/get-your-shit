import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateOrderItemDto {
  
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  orderId: string;

}
