import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsTeacherAuthorization } from 'src/auth/decorators/is.teacher.decorator';
import { exceptionhandling } from 'src/utils/exceptions/exceptionhandling';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({
    summary: 'Adicionar um novo usuário',
  })
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Visualizar todos os usuários',
  })
  @Get()
  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @ApiBearerAuth()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um usuário pelo ID',
  })
  @Get(':id')
  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Atualizar um usuário pelo ID',
  })
  @Patch(':id')
  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Remover um usuário pelo ID',
  })
  @Delete(':id')
  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @ApiBearerAuth()
  async delete(@Param('id') id: string): Promise<UserEntity> {
    try {
      return await this.service.delete(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }
}
