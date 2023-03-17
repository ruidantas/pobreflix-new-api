import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { CreateSerieDto } from './dto/create-serie.dto';
import { UpdateSerieDto } from './dto/update-serie.dto';
import { SerieEntity } from './entities/serie.entity';
import { SerieRepository } from './serie.repository';

@Injectable()
export class SerieService {
  constructor(private readonly repository: SerieRepository) {}
  async create(dto: CreateSerieDto): Promise<SerieEntity> {
    try {
      const serie: SerieEntity = { ...dto, id: randomUUID() };
      return await this.repository.create(serie);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async findAll(): Promise<SerieEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async findOne(id: string): Promise<SerieEntity> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      throw new Exceptions(Exception.NotFoundException);
    }
  }

  async update(id: string, dto: UpdateSerieDto): Promise<SerieEntity> {
    try {
      await this.findOne(id);
      const data: Partial<SerieEntity> = { ...dto };
      return await this.repository.update(id, data);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async delete(id: string): Promise<SerieEntity> {
    try {
      await this.findOne(id);
      return await this.repository.delete(id);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }
}
