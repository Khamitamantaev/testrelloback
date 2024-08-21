import { Comment } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CommentEntity implements Comment {

    @ApiProperty()
    id: number;

    @ApiProperty()
    text: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    cardId: number;
}