import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './serie.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SerieRepository } from './serie.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [SerieController],
  providers: [SerieService, SerieRepository],
})
export class SerieModule {}
