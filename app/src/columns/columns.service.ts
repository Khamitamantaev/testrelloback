import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {
    constructor(private prisma: PrismaService){}


    async createColumns(createDto: CreateColumnDto) {
        await this.prisma.column.create({ data: createDto })
    }

    async findUserColumnsById(userId: number) {
        
    }
}
