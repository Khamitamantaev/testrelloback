import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.createComment(createCommentDto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateComment(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.updateCommentById(id, updateCommentDto)
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findCommentById(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.findCommentById(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCommentById(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.deleteCommentById(id)
    }
}
