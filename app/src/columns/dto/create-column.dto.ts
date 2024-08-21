import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateColumnDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    title: string

    @IsInt()
    userId: number
}