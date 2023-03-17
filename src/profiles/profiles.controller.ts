import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { exceptionhandling } from 'src/utils/exceptions/exceptionhandling';
import { AuthGuard } from '@nestjs/passport';
import { IsTeacherAuthorization } from 'src/auth/decorators/is.teacher.decorator';

@ApiTags('profiles')
@UseGuards(AuthGuard(), IsTeacherAuthorization)
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @ApiOperation({
    summary: 'Criar um perfil',
  })
  @Post()
  async create(@Body() dto: CreateProfileDto) {
    try {
      return await this.service.create(dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Visualizar todos os perfils',
  })
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um perfil pelo ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Editar um perfil pelo ID',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Deletar um perfil pelo ID',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.service.delete(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }
}
