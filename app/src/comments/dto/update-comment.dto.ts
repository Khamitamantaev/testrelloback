import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {

    @IsString()
    @MinLength(4)
    @MaxLength(100)
    @ApiProperty()
    text: string
}