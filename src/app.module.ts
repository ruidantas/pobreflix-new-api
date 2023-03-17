import { Module } from '@nestjs/common';
import { AnimeModule } from './anime/anime.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SerieModule } from './serie/serie.module';
import { UserModule } from './users/user.module';



@Module({
  imports: [UserModule, PrismaModule, ProfilesModule, MovieModule, SerieModule, AnimeModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
