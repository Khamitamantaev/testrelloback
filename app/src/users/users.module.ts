// src/users/users.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { ColumnsModule } from 'src/columns/columns.module';
import { ColumnsService } from 'src/columns/columns.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, ColumnsService,JwtService],
  imports: [PrismaModule, forwardRef(() => ColumnsModule)],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}