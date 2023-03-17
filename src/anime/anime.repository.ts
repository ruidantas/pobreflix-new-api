import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { AnimeEntity } from './entities/anime.entity';


@Injectable()
export class AnimeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: AnimeEntity): Promise<AnimeEntity> {

      return await this.prisma.anime.create({ data });
 
  }

  async findAll(): Promise<AnimeEntity[]> {
    try {
      return await this.prisma.anime.findMany();
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findOne(id: string): Promise<AnimeEntity> {
    try {
      return await this.prisma.anime.findFirstOrThrow({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException)
    }
  }

  async update(id: string, data: Partial<AnimeEntity>): Promise<AnimeEntity> {
    try {
      return await this.prisma.anime.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async delete(id: string): Promise<AnimeEntity> {
    try {
      return await this.prisma.anime.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
}
