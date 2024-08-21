import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { CardsModule } from 'src/cards/cards.module';
import { CardsService } from 'src/cards/cards.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ColumnsModule } from 'src/columns/columns.module';
import { ColumnsService } from 'src/columns/columns.service';

@Module({
  imports: [PrismaModule, CardsModule, UsersModule, ColumnsModule],
  providers: [CommentsService, JwtService, CardsService, UsersService, ColumnsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
