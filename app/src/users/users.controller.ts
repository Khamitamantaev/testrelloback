import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ColumnsService } from 'src/columns/columns.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user-entity';
import { AuthGuard } from 'src/auth/guards/auth-guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnService: ColumnsService
  ) { }

  @ApiOperation({
    summary: 'Create User',
    description: 'Создание пользователя(email: почта, password: пароль для входа)',
  })
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get users',
    description: 'Получение списка пользователей(массив)',
  })
  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user',
    description: 'Получение пользователя по Id',
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({
    summary: 'Get user with all data',
    description: 'Получение пользователя по Id и всех его данных: (колонки, карточки, комментарии)',
  })
  @Get('/all/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOneWithData(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneWithData(id);
  }

  @ApiOperation({
    summary: 'Get user columns',
    description: 'Получение всех колонок пользователя',
  })
  @Get('/:id/columns')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findAllUserColumnsById(@Param('id', ParseIntPipe) id: number) {
    return this.columnService.findUserColumnsById(id)
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Обновление пользователя',
  })
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Удаление пользователя по id',
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
