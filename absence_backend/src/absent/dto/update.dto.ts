import { IsDateString, IsNotEmpty, Length } from "class-validator";

export class UpdateDto {
    @IsNotEmpty()
    @Length(3, 255)
    reason: string;

    @IsNotEmpty()
    @IsDateString()
    date_start: string;

    @IsNotEmpty()
    @IsDateString()
    date_end: string;
}
