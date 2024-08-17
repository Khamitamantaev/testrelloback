import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) { }


    async createComment(createDto: CreateCommentDto) {
        return this.prisma.comment.create({ data: createDto })
    }

    async findCommentById(id: number) {
        return this.prisma.comment.findUnique({ where: { id }})
    }

    async findCardCommentsDataById(cardId: number) {
        return this.prisma.comment.findMany({ where: { cardId } })
    }

    async updateCommentById(commentId: number, commentUpdateDto: UpdateCommentDto ) {
        return this.prisma.comment.update({ where: { id: commentId}, data: commentUpdateDto})
    }
    
    async deleteCommentById(commentId: number) {
        return this.prisma.comment.delete({ where: { id: commentId }})
    }

    async deleteCommentsByCardId(cardId: number) {
        return this.prisma.comment.deleteMany({ where: { cardId }})
    }
}
