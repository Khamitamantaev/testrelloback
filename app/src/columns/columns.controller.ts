import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { UserColumnGuard } from 'src/auth/guards/user-column-guard';

@Controller('columns')
export class ColumnsController {
    constructor(private columnService: ColumnsService) {}

    @Post()
    @UseGuards(AuthGuard, UserColumnGuard)
    async createColumn(@Body() createColumnDto: CreateColumnDto) {
        return this.columnService.createColumn(createColumnDto)
    }

    @Patch(':id')
    @UseGuards(AuthGuard, UserColumnGuard)
    async updateColumn(@Param('id', ParseIntPipe) id: number, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnService.updateColumnById(id, updateColumnDto)
    }
    
    @Get(':id')
    @UseGuards(AuthGuard, UserColumnGuard)
    async findColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.findColumnById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, UserColumnGuard)
    async deleteColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.deleteColumnById(id)
    }
}
