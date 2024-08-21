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
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user-entity';
import { AuthGuard } from 'src/auth/guards/auth-guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnService: ColumnsService
  ) { }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/all/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findOneWithData(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneWithData(id);
  }

  @Get('/:id/columns')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findAllUserColumnsById(@Param('id', ParseIntPipe) id: number) {
    return this.columnService.findUserColumnsById(id)
  }

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

  @Delete('/:id/columns')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async deleteAllUserColumnsByid(@Param('id', ParseIntPipe) id: number) {
    return await this.columnService.deleteColumnByUserId(id)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
