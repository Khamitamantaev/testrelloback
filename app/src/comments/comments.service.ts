import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        const comment = await this.prisma.comment.findUnique({ where: { id }})
        if(!comment) throw new HttpException("Комментарий с таким id не найден", HttpStatus.NOT_FOUND)
        else return comment
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
