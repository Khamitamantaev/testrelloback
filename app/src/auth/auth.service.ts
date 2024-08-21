//src/auth/auth.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordMatching = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordMatching) {
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}