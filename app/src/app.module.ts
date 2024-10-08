import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import config from './utils/config/configuration';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    PrismaModule, 
    ColumnsModule, 
    CardsModule, 
    CommentsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
  ],
})
export class AppModule {}
