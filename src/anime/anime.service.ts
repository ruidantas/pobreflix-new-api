import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { AnimeRepository } from './anime.repository';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { AnimeEntity } from './entities/anime.entity';

@Injectable()
export class AnimeService {
  constructor(private readonly repository: AnimeRepository) {}
  async create(dto: CreateAnimeDto): Promise<AnimeEntity> {
    try {
      const anime: AnimeEntity = { ...dto, id: randomUUID() };
      return await this.repository.create(anime);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async findAll(): Promise<AnimeEntity[]> {
    try {
      return await this.repository.findAll();
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async findOne(id: string): Promise<AnimeEntity> {
    try {
      return await this.repository.findOne(id);
    } catch (err) {
      throw new Exceptions(Exception.NotFoundException);
    }
  }

  async update(id: string, dto: UpdateAnimeDto): Promise<AnimeEntity> {
    try {
      await this.findOne(id);
      const data: Partial<AnimeEntity> = { ...dto };
      return await this.repository.update(id, data);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }

  async delete(id: string): Promise<AnimeEntity> {
    try {
      await this.findOne(id);
      return await this.repository.delete(id);
    } catch (err) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
  }
}
