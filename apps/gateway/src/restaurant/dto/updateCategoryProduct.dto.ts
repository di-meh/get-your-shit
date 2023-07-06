import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateCategoryProductDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
