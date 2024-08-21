import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { ColumnsService } from 'src/columns/columns.service';

@Module({
  imports: [PrismaModule, UsersModule, ColumnsModule],
  providers: [CardsService, JwtService, ColumnsService],
  controllers: [CardsController]
})
export class CardsModule {}
