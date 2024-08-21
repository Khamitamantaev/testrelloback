import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { UserCommentGuard } from 'src/auth/guards/user-comment-guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from './entities/comment-entity';

@Controller('comments')
@ApiTags("Comments")
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiCreatedResponse({ type: CommentEntity })
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.createComment(createCommentDto)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    async updateComment(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.updateCommentById(id, updateCommentDto)
    }
    
    @Get(':id')
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    async findCommentById(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.findCommentById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    async deleteCommentById(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.deleteCommentById(id)
    }
}
