import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
    constructor(private columnService: ColumnsService) {}

    @Post()
    async createColumn(createColumnDto: CreateColumnDto) {
        return this.columnService.createColumns(createColumnDto)
    }

    @Patch(':id')
    async updateColumn(@Param('id', ParseIntPipe) id: number, updateColumnDto: UpdateColumnDto) {
        return this.columnService.updateColumnById(id, updateColumnDto)
    }
    
    @Get(':id')
    async findColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.findColumnById(id)
    }

    @Delete(':id')
    async deleteColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.deleteColumnById(id)
    }
}
