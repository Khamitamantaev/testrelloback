import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateCardDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    title: string
}