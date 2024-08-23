import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { UserCommentGuard } from 'src/auth/guards/user-comment-guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from './entities/comment-entity';
import { ParseIntPipe } from 'src/utils/pipes/parse-int.pipe';

@Controller('comments')
@ApiTags("Comments")
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @ApiOperation({
        summary: 'Create Comment',
        description: 'Создание комментария(text: текст, cardId: карточка, к которой прикрепляется комментарий)',
    })
    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CommentEntity })
    async createComment(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.createComment(createCommentDto)
    }

    @ApiOperation({
        summary: 'Update Comment',
        description: 'Обновление комментария(text: текст для обновления)',
    })
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    async updateComment(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.updateCommentById(id, updateCommentDto)
    }
    
    @ApiOperation({
        summary: 'Get Comment',
        description: 'Получение комментария по id',
    })
    @Get(':id')
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    async findCommentById(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.findCommentById(id)
    }

    @ApiOperation({
        summary: 'Delete Comment',
        description: 'Удаление комментария по id',
    })
    @Delete(':id')
    @UseGuards(AuthGuard, UserCommentGuard)
    @ApiBearerAuth()
    async deleteCommentById(@Param('id', ParseIntPipe) id: number) {
        return this.commentsService.deleteCommentById(id)
    }
}
