import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ColumnsService {
    constructor(
        private prisma: PrismaService,
        private userService: UsersService
    ) { }

    async createColumn(createDto: CreateColumnDto) {
        return this.prisma.column.create({ data: createDto })
    }

    async findColumnById(id: number) {
        const findColumn = await this.prisma.column.findUnique({ where: { id }})
        if(!findColumn) throw new HttpException("Колонка с таким Id не найдена для обновления", HttpStatus.NOT_FOUND)
        else return findColumn
    }

    // async findUserColumnsAllDataById(userId: number) {
    //     return this.prisma.column.findMany({ where: { userId }, include: { cards: { include: { comments: true } } } })
    // }

    async findUserColumnsById(userId: number) {
        const findUser = await this.userService.findOne(userId)
        if (findUser) return this.prisma.column.findMany({ where: { userId } })
    }

    async updateColumnById(columnId: number, columnUpdateDto: UpdateColumnDto) {
        const findColumn = await this.prisma.column.findUnique({ where: { id: columnId}})
        if(!findColumn) throw new HttpException("Колонка с таким Id не найдена для обновления", HttpStatus.NOT_FOUND)
        return this.prisma.column.update({ where: { id: columnId }, data: columnUpdateDto })
    }

    async deleteColumnById(columnId: number) {
        const findColumn = await this.prisma.column.findUnique({ where: { id: columnId}})
        if(!findColumn) throw new HttpException("Колонка с таким Id не найдена", HttpStatus.NOT_FOUND)
        else return this.prisma.column.delete({ where: { id: columnId } })
    }

    async deleteColumnByUserId(userId: number) {
        const findUser = await this.userService.findOne(userId)
        if (findUser) return this.prisma.column.deleteMany({ where: { userId } })
    }
}
