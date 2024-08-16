// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { ColumnsModule } from 'src/columns/columns.module';
import { ColumnsService } from 'src/columns/columns.service';

@Module({
  providers: [UsersService, ColumnsService],
  imports: [PrismaModule, ColumnsModule],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}