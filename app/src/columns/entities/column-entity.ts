import { Column } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnEntity implements Column {

    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    userId: number;
}