import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateDemandDriverDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsString()
    @IsNotEmpty()
    departement: string;

    @IsString()
    @IsNotEmpty()
    vehicule_type: string;

    @IsString()
    @IsNotEmpty()
    date_birth: Date;
}
