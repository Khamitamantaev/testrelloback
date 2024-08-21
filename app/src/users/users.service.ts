// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findUserByCardId(id: number) {
    return this.prisma.user.findFirst({
      include: {
        columns: {
          include: {
            cards: {
              where: { id }
            }
          }
        },
      },
    })
  }

  async findUserByColumnUserId(id: number) {
    return this.prisma.user.findFirst({
      include: {
        columns: {
          where: {
            id
          }
        },
      },
    })
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, password: false } });
  }

  // Получаем пользователя со всеми данным  
  async findOneWithData(id: number) {
    return this.prisma.user.findFirst({ where: { id }, include: { columns: { include: { cards: { include: { comments: true } } } } } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
