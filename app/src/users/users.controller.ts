import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { ColumnsService } from 'src/columns/columns.service';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly columnService: ColumnsService
    ) {}
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
      return await this.usersService.create(createUserDto);
    }
  
    @Get()
    // @UseGuards(JwtAuthGuard)
    async findAll() {
      return this.usersService.findAll();
    }
  
    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }

    @Get('/all/:id')
    // @UseGuards(JwtAuthGuard)
    async findOneWithData(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOneWithData(id);
    }

    // Найти все колонки юзера по userId
    @Get('/:id/columns')
    async findAllUserColumnsById(@Param('id', ParseIntPipe) id: number) {
      return this.columnService.findUserColumnsById(id)
    }
  
    @Patch(':id')
    // @UseGuards(JwtAuthGuard)
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return await this.usersService.update(id, updateUserDto);
    }

    @Delete('/:id/columns')
    async deleteAllUserColumnsByid(@Param('id', ParseIntPipe) id: number) {
      return await this.columnService.deleteColumnByUserId(id)
    }
  
    @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    async remove(@Param('id', ParseIntPipe) id: number) {
      return await this.usersService.remove(id);
    }
  }
  