import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ColumnsService]
})
export class ColumnsModule {}
