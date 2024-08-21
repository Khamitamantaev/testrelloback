import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"


export class CreateUserDto {

    @IsEmail()
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Ненадежный пароль'})
    password: string
}