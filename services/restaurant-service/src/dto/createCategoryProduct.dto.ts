import {
    IsDefined,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateCategoryProductDto {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}

