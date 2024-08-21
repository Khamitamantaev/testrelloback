import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty()
    title: string
    
    @IsInt()
    @ApiProperty()
    columnId: number
   
}