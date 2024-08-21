import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength,  } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Ненадежный пароль'})
    password: string
}