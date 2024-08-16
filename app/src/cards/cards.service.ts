import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
    constructor(private prisma: PrismaService) { }


    async createCard(createDto: CreateCardDto) {
        return this.prisma.card.create({ data: createDto })
    }

    async findCardById(id: number) {
        return this.prisma.card.findUnique({ where: { id } })
    }

    async findColumnCardsById(columnId: number) {
        return this.prisma.card.findMany({ where: { columnId } })
    }

    // Обновление карточки по Id
    async updateCardById(cardId: number, cardUpdateDto: UpdateCardDto) {
        return this.prisma.card.update({ where: { id: cardId }, data: cardUpdateDto })
    }

    // Удаление по id
    async deleteCardById(cardId: number) {
        return this.prisma.card.delete({ where: { id: cardId } })
    }

    // Удаление по columnId всех его карточек
    async deleteColumnCardsById(columnId: number) {
        return this.prisma.card.deleteMany({ where: { columnId } })
    }
}
