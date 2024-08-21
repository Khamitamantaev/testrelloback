import { Card } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CardEntity implements Card {

    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    title: string;

    @ApiProperty()
    columnId: number;
}