import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCardDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    title: string
}