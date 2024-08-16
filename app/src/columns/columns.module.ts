import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ColumnsController } from './columns.controller';

@Module({
  imports: [PrismaModule],
  providers: [ColumnsService],
  controllers: [ColumnsController]
})
export class ColumnsModule {}
