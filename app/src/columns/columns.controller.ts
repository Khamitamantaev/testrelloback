import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { UserColumnGuard } from 'src/auth/guards/user-column-guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './entities/column-entity';

@Controller('columns')
@ApiTags('Columns')
export class ColumnsController {
    constructor(private columnService: ColumnsService) { }

    @ApiOperation({
        summary: 'Create Сolumn',
        description: 'Создание колонки(title: Название, userId: user, к которой прикрепляется колонка)',
    })
    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserColumnGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: ColumnEntity })
    async createColumn(@Body() createColumnDto: CreateColumnDto) {
        return this.columnService.createColumn(createColumnDto)
    }

    @ApiOperation({
        summary: 'Update Сolumn',
        description: 'Обновление колонки через title',
    })
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserColumnGuard)
    @ApiBearerAuth()
    async updateColumn(@Param('id', ParseIntPipe) id: number, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnService.updateColumnById(id, updateColumnDto)
    }

    @ApiOperation({
        summary: 'Get Сolumn',
        description: 'Получение колонки по Id',
    })
    @Get(':id')
    @UseGuards(AuthGuard, UserColumnGuard)
    @ApiBearerAuth()
    async findColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.findColumnById(id)
    }

    @ApiOperation({
        summary: 'Delete Сolumn',
        description: 'Удаление колонки по Id',
    })
    @Delete(':id')
    @UseGuards(AuthGuard, UserColumnGuard)
    @ApiBearerAuth()
    async deleteColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.deleteColumnById(id)
    }

    @ApiOperation({
        summary: 'Delete columns',
        description: 'Удаление всех колонок пользователя по userId',
    })
    @Delete('/:id/columns')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async deleteAllUserColumnsByid(@Param('id', ParseIntPipe) id: number) {
        return await this.columnService.deleteColumnByUserId(id)
    }
}
