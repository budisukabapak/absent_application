import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class RegisterDto {
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

    @IsNotEmpty()
    @IsEnum(["male", "female"])
    gender: "male" | "female";

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, {
        message: 'Password must be at least 8 characters long and include letters and numbers.',
    })
    password: string;
}
