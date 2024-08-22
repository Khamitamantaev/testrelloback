// src/users/users.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

    const findUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email }})
    if(findUser) throw new HttpException("Юзер с таким email уже существует", HttpStatus.OK)

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
    const findUser = await this.prisma.user.findUnique({ where: { id }})
    if(!findUser) throw new HttpException("Юзер с таким Id не найден", HttpStatus.NOT_FOUND)
    else return this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, password: false } });
  }

  async findOneWithData(id: number) {
    const findUser = await this.prisma.user.findUnique({ where: { id }})
    if(!findUser) throw new HttpException("Юзер с таким Id не найден", HttpStatus.NOT_FOUND)
    return this.prisma.user.findFirst({ where: { id }, include: { columns: { include: { cards: { include: { comments: true } } } } } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.prisma.user.findUnique({ where: { id }})
    if(updateUserDto.email) {
      const checkUserWithEmail = await this.prisma.user.findUnique({ where: { email: updateUserDto.email }})
      if(checkUserWithEmail) throw new HttpException("Юзер с таким email уже существует", HttpStatus.NOT_FOUND)
    }
    if(!findUser ) throw new HttpException("Юзер с таким Id не найден для обновления", HttpStatus.NOT_FOUND)
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
    const user = await this.prisma.user.findUnique({ where: { id }})
    if(!user) throw new HttpException('Пользователя с таким Id не существует для удаления', HttpStatus.NOT_FOUND);
    else return this.prisma.user.delete({ where: { id } });
  }
}
