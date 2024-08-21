import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';

export class CreateCardDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    title: string
    
    @IsInt()
    columnId: number
   
}