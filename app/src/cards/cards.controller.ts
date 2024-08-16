import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createCard(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.createCard(createCardDto)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateCardById(@Param('id', ParseIntPipe) id: number, updateCardDto: UpdateCardDto) {
        return this.cardsService.updateCardById(id, updateCardDto)
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.findCardById(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteCardById(id)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteColumnCardsById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteColumnCardsById(id)
    }
}
