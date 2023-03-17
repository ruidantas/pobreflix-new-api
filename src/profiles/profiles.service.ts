import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateProfileDto) {
    try {
      const data: Prisma.ProfilesCreateInput = {
        id: randomUUID(),
        user: {
          connect: {
            email: dto.userEmail,
          },
        },
        movie: {
          connect: dto.movie.map((el) => ({ id: el})),
        },
        serie: {
          connect: dto.serie.map((el) => ({ id: el})),
        },
        anime: {
          connect: dto.anime.map((el) => ({ id: el})),
        },
      };

      return await this.prisma.profiles.create({
        data,
        select: {
          id: true,
          user: {
            select: {
              name: true,
            },
          },
          movie: {
            select: {
              title: true,
            },
          },
          serie: {
            select: {
              title: true,
            },
          },
          anime: {
            select: {
              title: true,
            },
          },
        },
      });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findAll() {
    try {
      return await this.prisma.profiles.findMany({
        select: {
          id: true,
          user: {
            select: {
              name: true,
              email: true,
              idade: true,
            },
          },
          movie: {
            select: {
              title: true,
              description: true,
              avaliation: true,
              image: true,
            },
          },
          serie: {
            select: {
              title: true,
              description: true,
              avaliation: true,
              image: true,
            },
          },
          anime: {
            select: {
              title: true,
              description: true,
              avaliation: true,
              image: true,
            },
          },
        },
      });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.profiles.findUnique({
        where: { id },
        include: {
          user: true,
          movie: true,
          serie: true,
          anime: true,
        },
      });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }

  async update(id: string, dto: UpdateProfileDto) {
    try {
      return await this.prisma.profiles.update({
        where: { id },
        data: {
          user: {
            connect: {
              email: dto.userEmail,
            },
          },
          movie: {
            connect: dto.movie?.map((el) => ({ id: el  })),
          },          
          serie: {
            connect: dto.serie?.map((el) => ({ id: el  })),           
          },
          anime: {
            connect: dto.anime?.map((el) => ({ id: el  })),           
          },
        },
        include: {
          movie: true, serie: true, anime: true,
        }
      });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
  async delete(id: string) {
    try {
      return await this.prisma.profiles.delete({ where: { id } });
    } catch (err) {
      throw new Exceptions(Exception.DatabaseException);
    }
  }
}
