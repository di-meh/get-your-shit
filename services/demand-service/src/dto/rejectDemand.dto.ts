import {IsNotEmpty, IsUUID} from "class-validator";

export class RejectDemandDto {
    @IsUUID()
    @IsNotEmpty()
    id: string

    @IsUUID()
    @IsNotEmpty()
    reviewerId: string
}