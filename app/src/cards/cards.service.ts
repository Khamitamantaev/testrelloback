import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        const findCard = await this.prisma.card.findUnique({ where: { id }})
        if(!findCard) throw new HttpException("Карточка с таким Id не найдена", HttpStatus.NOT_FOUND)
        return findCard
    }

    async findColumnCardsById(columnId: number) {
        return this.prisma.card.findMany({ where: { columnId } })
    }

    async updateCardById(cardId: number, cardUpdateDto: UpdateCardDto) {
        return this.prisma.card.update({ where: { id: cardId }, data: cardUpdateDto })
    }

    async deleteCardById(cardId: number) {
        return this.prisma.card.delete({ where: { id: cardId } })
    }

    async deleteColumnCardsById(columnId: number) {
        return this.prisma.card.deleteMany({ where: { columnId } })
    }
}
