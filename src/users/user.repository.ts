import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { UserEntity } from './entities/user-entity';

@Injectable()
export class UserRepository {
  private Select = {
    id: true,
    name: true,
    cpf: false,
    email: true,
    idade: true,
    role: false,
    password: false,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}
  async create(data: UserEntity): Promise<UserEntity> {
    try {
      return await this.prisma.user.create({ data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.prisma.user.findMany({ select: this.Select });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
  async findOne(id: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.findFirstOrThrow({ where: { id }, select: this.Select });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return await this.prisma.user.update({ where: { id }, data });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async delete(id: string): Promise<UserEntity> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
}
