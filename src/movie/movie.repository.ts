import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: MovieEntity): Promise<MovieEntity> {
    try {
      return await this.prisma.movie.create({ data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findAll(): Promise<MovieEntity[]> {
    try {
      return await this.prisma.movie.findMany();
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findOne(id: string): Promise<MovieEntity> {
    try {
      return await this.prisma.movie.findFirstOrThrow({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async update(id: string, data: Partial<MovieEntity>): Promise<MovieEntity> {
    try {
      return await this.prisma.movie.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async delete(id: string): Promise<MovieEntity> {
    try {
      return await this.prisma.movie.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
}
