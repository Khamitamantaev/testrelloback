import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ColumnsService } from 'src/columns/columns.service';

@Injectable()
export class CardsService {
    constructor(private prisma: PrismaService, private columnService: ColumnsService) { }


    async createCard(createDto: CreateCardDto) {
        if (!isNaN(createDto.columnId)) {
            return this.prisma.card.create({ data: createDto })
        } else throw new HttpException("Пожалуйста введите корректный id колонки", HttpStatus.NOT_FOUND)

    }

    async findCardById(id: number) {
        if (!isNaN(id)) {
            const findCard = await this.prisma.card.findUnique({ where: { id } })
            if (!findCard) throw new HttpException("Карточка с таким Id не найдена", HttpStatus.NOT_FOUND)
            return findCard
        } else throw new HttpException("Пожалуйста введите корректный id карточки", HttpStatus.NOT_FOUND)
    }

    async updateCardById(cardId: number, cardUpdateDto: UpdateCardDto) {
        if (!isNaN(cardUpdateDto.columnId)) {
            const findColumn = await this.columnService.findColumnById(cardUpdateDto.columnId)
            if (findColumn) return this.prisma.card.update({ where: { id: cardId }, data: cardUpdateDto })
        } else throw new HttpException("Пожалуйста введите корректный id колонки для перемещения", HttpStatus.NOT_FOUND)
    }

    async deleteCardById(cardId: number) {
        return this.prisma.card.delete({ where: { id: cardId } })
    }

    async deleteColumnCardsById(columnId: number) {
        return this.prisma.card.deleteMany({ where: { columnId } })
    }
}
