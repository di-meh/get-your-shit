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
    @IsUUID()
    @IsDefined()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsDefined()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

}
