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
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { exceptionhandling } from 'src/utils/exceptions/exceptionhandling';
import { MovieEntity } from './entities/movie.entity';
import { AuthGuard } from '@nestjs/passport';
import { IsTeacherAuthorization } from 'src/auth/decorators/is.teacher.decorator';

@ApiTags('movie')
@UseGuards(AuthGuard(), IsTeacherAuthorization)
@ApiBearerAuth()
@Controller('movie')
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @ApiOperation({
    summary: 'Adicionar um novo filme',
  })
  @Post()
  async create(@Body() dto: CreateMovieDto): Promise<MovieEntity> {
    try {
      return await this.service.create(dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Visualizar todos os filmes',
  })
  @Get()
  async findAll(): Promise<MovieEntity[]> {
    try {
      return await this.service.findAll();
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Buscar um filme pelo ID',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MovieEntity> {
    try {
      return await this.service.findOne(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Editar um filme pelo ID',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    try {
      return await this.service.update(id, dto);
    } catch (err) {
      exceptionhandling(err);
    }
  }

  @ApiOperation({
    summary: 'Remover um filme pelo ID',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<MovieEntity> {
    try {
      return await this.service.delete(id);
    } catch (err) {
      exceptionhandling(err);
    }
  }
}
