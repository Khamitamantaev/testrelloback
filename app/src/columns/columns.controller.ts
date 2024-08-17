import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from 'src/auth/auth-guard';

@Controller('columns')
export class ColumnsController {
    constructor(private columnService: ColumnsService) {}

    @Post()
    @UseGuards(AuthGuard)
    async createColumn(@Body() createColumnDto: CreateColumnDto, @Req() request) {
        return this.columnService.createColumns(createColumnDto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateColumn(@Param('id', ParseIntPipe) id: number, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnService.updateColumnById(id, updateColumnDto)
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.findColumnById(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteColumnById(@Param('id', ParseIntPipe) id: number) {
        return this.columnService.deleteColumnById(id)
    }
}
