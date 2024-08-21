import { forwardRef, Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ColumnsController } from './columns.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule],
  providers: [ColumnsService, JwtService, UsersService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}
