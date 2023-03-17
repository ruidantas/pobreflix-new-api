import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private readonly repository: MovieRepository) {}
  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    try {
      const movie: MovieEntity = { ...dto, id: randomUUID() };
      return await this.repository.create(movie);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async findAll(): Promise<MovieEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async findOne(id: string): Promise<MovieEntity> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      throw new Exceptions(Exception.NotFoundException);
    }
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieEntity> {
    try {
      await this.findOne(id);
      const data: Partial<MovieEntity> = { ...dto };
      return await this.repository.update(id, data);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async delete(id: string): Promise<MovieEntity> {
    try {
      await this.findOne(id);
      return await this.repository.delete(id);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }
}
