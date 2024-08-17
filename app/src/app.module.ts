import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ColumnsModule, CardsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
