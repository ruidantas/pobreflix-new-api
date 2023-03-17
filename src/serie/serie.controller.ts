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
import { SerieService } from './serie.service';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { exceptionhandling } from 'src/utils/exceptions/exceptionhandling';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { IsTeacherAuthorization } from 'src/auth/decorators/is.teacher.decorator';

@ApiTags('serie')
@UseGuards(AuthGuard(), IsTeacherAuthorization)
@ApiBearerAuth()
@Controller('serie')
export class SerieController {
  constructor(private readonly service: SerieService) {}

  @ApiOperation({
    summary: 'Adicionar uma nova série',
  })
  @Post()
  async create(@Body() dto: CreateSerieDto) {
    try {
      return await this.service.create(dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Vizualizar todas as séries',
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
    summary: 'Buscar uma série pelo ID',
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
    summary: 'Atualizar uma série pelo ID',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateSerieDto) {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Remover uma série pelo ID',
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
