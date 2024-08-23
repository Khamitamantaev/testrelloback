import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth-guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UserCardGuard } from 'src/auth/guards/user-card-guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CardEntity } from './entities/card-entity';
import { ParseIntPipe } from 'src/utils/pipes/parse-int.pipe';

@Controller('cards')
@ApiTags('Cards')
export class CardsController {
    constructor(private cardsService: CardsService) { }

    @ApiOperation({
        summary: 'Create Card',
        description: 'Создание карточки(title: Название, columnId: колонка, к которой прикрепляется карточка)',
    })
    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCardGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ type: CardEntity })
    async createCard(@Body() createCardDto: CreateCardDto) {
        return this.cardsService.createCard(createCardDto)
    }

    @ApiOperation({
        summary: 'Update Card',
        description: 'Обновление карточки(title: Название, columnId: колонка, к которой прикрепляется карточка после обновления)',
    })
    @Patch(':id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard, UserCardGuard)
    @ApiBearerAuth()
    async updateCardById(@Param('id', ParseIntPipe) id: number, @Body() updateCardDto: UpdateCardDto) {
        return this.cardsService.updateCardById(id, updateCardDto)
    }

    @ApiOperation({
        summary: 'Get Card',
        description: 'Получение карточки по id',
    })
    @Get(':id')
    @UseGuards(AuthGuard, UserCardGuard)
    @ApiBearerAuth()
    async findCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.findCardById(id)
    }

    @ApiOperation({
        summary: 'Delete Card',
        description: 'Удаление карточки по id',
    })
    @Delete(':id')
    @UseGuards(AuthGuard, UserCardGuard)
    @ApiBearerAuth()
    async deleteCardById(@Param('id', ParseIntPipe) id: number) {
        return this.cardsService.deleteCardById(id)
    }
}
