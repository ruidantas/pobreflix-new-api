import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { SerieEntity } from './entities/serie.entity';


@Injectable()
export class SerieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: SerieEntity): Promise<SerieEntity> {
    try {
      return await this.prisma.serie.create({ data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findAll(): Promise<SerieEntity[]> {
    try {
      return await this.prisma.serie.findMany();
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findOne(id: string): Promise<SerieEntity> {
    try {
      return await this.prisma.serie.findFirstOrThrow({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async update(id: string, data: Partial<SerieEntity>): Promise<SerieEntity> {
    try {
      return await this.prisma.serie.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async delete(id: string): Promise<SerieEntity> {
    try {
      return await this.prisma.serie.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
}
