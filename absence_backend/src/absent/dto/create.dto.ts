import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @Length(3, 255)
    reason: string;

    @IsNotEmpty()
    @IsDateString()
    date_start: string;

    @IsNotEmpty()
    @IsDateString()
    date_end: string;

    @IsNotEmpty()
    @IsNumber()
    employee_id: number;
}
