import { IsDateString, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class UpdateDto {
    @IsNotEmpty()
    @Length(3, 100)
    first_name: string;

    @IsNotEmpty()
    @Length(3, 100)
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsDateString()
    birth_date: string;

    @IsMobilePhone()
    @Length(10, 15)
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    address: string;

    @IsNotEmpty()
    @IsEnum(["male", "female"])
    gender: "male" | "female";
}
