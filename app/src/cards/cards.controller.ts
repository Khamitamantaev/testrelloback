import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UserCardGuard } from 'src/auth/guards/user-card-guard';

@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @Post()
    @UseGuards(AuthGuard, UserCardGuard)
    async createCard(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.createCard(createCardDto)
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateCardById(@Param('id', ParseIntPipe) id: number, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.updateCardById(id, updateCardDto)
    }
    
    @Get(':id')
    @UseGuards(AuthGuard, UserCardGuard)
    async findCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.findCardById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteCardById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteColumnCardsById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteColumnCardsById(id)
    }
}
