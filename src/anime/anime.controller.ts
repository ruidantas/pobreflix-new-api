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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsTeacherAuthorization } from 'src/auth/decorators/is.teacher.decorator';
import { exceptionhandling } from 'src/utils/exceptions/exceptionhandling';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AnimeEntity } from './entities/anime.entity';

@ApiTags('anime')
@UseGuards(AuthGuard(), IsTeacherAuthorization)
@ApiBearerAuth()
@Controller('anime')
export class AnimeController {
  constructor(private readonly service: AnimeService) {}

  @ApiOperation({
    summary: 'Adicionar um novo anime',
  })
  @Post()
  async create(@Body() dto: CreateAnimeDto): Promise<AnimeEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Visualizar todos os animes',
  })
  @Get()
  async findAll(): Promise<AnimeEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um anime pelo ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AnimeEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Editar um anime pelo ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAnimeDto,
  ): Promise<AnimeEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Remover um anime pelo ID',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AnimeEntity> {
    try {
      return await this.service.delete(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }
}
