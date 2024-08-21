import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    @ApiProperty()
    name: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsOptional()
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Ненадежный пароль'})
    password: string
}