import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    name: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Ненадежный пароль'})
    password: string
}