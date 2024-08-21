import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UserCardGuard } from 'src/auth/guards/user-card-guard';
import { FindOneParams } from './dto/find-one.params';

@Controller('cards')
export class CardsController {
    constructor(private cardsService: CardsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCardGuard)
    async createCard(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.createCard(createCardDto)
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCardGuard)
    async updateCardById(@Param() params: FindOneParams, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.updateCardById(params.id, updateCardDto)
    }
    
    @Get(':id')
    @UseGuards(AuthGuard, UserCardGuard)
    async findCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.findCardById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, UserCardGuard)
    async deleteCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteCardById(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard, UserCardGuard)
    async deleteColumnCardsById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteColumnCardsById(id)
    }
}
