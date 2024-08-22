import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    title: string
}