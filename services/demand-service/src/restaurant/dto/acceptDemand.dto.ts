import {IsNotEmpty, IsUUID} from "class-validator";

export class AcceptDemandDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsUUID()
    @IsNotEmpty()
    reviewerId: string;
}