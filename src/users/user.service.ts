import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user-entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    if (dto.password != dto.confirmPassword) {
      throw new Exceptions(
        Exception.InvalidData,
        'senha e confirmação da senha precisão ser iguais',
      );
    }

    delete dto.confirmPassword;
    
    const user: UserEntity = {
      ...dto,
      id: randomUUID(),
      password: await hash(dto.password, 10),
    };
    const newUser = await this.repository.create(user);
    if (!newUser) {
      throw new Exceptions(Exception.InvalidData);
    }
    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    const unique = await this.repository.findOne(id);
    if (!unique) {
      throw new Exceptions(Exception.NotFoundData);
    }
    return unique;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);
    if(dto.password) {
        if(dto.password != dto.confirmPassword) {
            throw new Exceptions(
                Exception.InvalidData,
                'senha e confirmação da senha precisão ser iguais',
              );
        }
        delete dto.confirmPassword;
    }
    const data: Partial<UserEntity> = { ...dto };
    const user = await this.repository.update(id, data);
    if (!user) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    await this.findOne(id);
    const unique = await this.repository.delete(id);
    if (!unique) {
      throw new Exceptions(Exception.UnprocessableEntityException);
    }
    return unique;
  }
}
