import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AnimeRepository } from './anime.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [AnimeController],
  providers: [AnimeService, AnimeRepository],
})
export class AnimeModule {}
