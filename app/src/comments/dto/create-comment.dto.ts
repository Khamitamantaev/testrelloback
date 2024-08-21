import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateCommentDto {

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    text: string

    @IsInt()
    cardId: number
}