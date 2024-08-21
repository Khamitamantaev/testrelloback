import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
export class UpdateColumnDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    title: string
}