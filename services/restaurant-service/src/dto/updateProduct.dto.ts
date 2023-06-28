import {
    IsDefined,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
    IsUUID,
    IsNumber,
} from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    id: string;


    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    @IsUUID()
    categoryId: string;

}
