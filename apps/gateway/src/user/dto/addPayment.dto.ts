import { IsNotEmpty, IsString } from 'class-validator';

export class addPaymentDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;
}
