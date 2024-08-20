import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {
    constructor(private prisma: PrismaService) { }

    async createColumn(createDto: CreateColumnDto) {
        return this.prisma.column.create({ data: createDto })
    }

    async findColumnById(id: number) {
        return this.prisma.column.findUnique({ where: { id }})
    }

    async findUserAllDataById(userId: number) {
        return this.prisma.column.findMany({ where: { userId }, include: { cards: { include: { comments: true } } } })
    }

    // Колонки юзера без карточек
    async findUserColumnsById(userId: number) {
        return this.prisma.column.findMany({ where: { userId }})
    }

    // Обновление колонки по Id
    async updateColumnById(columnId: number, columnUpdateDto: UpdateColumnDto ) {
        return this.prisma.column.update({ where: { id: columnId}, data: columnUpdateDto})
    }
    
    // Удаление по id
    async deleteColumnById(columnId: number) {
        return this.prisma.column.delete({ where: { id: columnId }})
    }

    // Удаление по userId всех его колонок
    async deleteColumnByUserId(userId: number) {
        return this.prisma.column.deleteMany({ where: { userId }})
    }
}
