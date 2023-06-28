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
    @IsUUID()
    @IsDefined()
    @IsNotEmpty()
    id: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string;
}

