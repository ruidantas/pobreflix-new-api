import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsUrl  } from 'class-validator';


export class CreateAnimeDto {
  @IsString()
  @ApiProperty({
    description: 'Titulo do anime',
    example: 'Naruto',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do anime',
    example: 'Anime de luta e aventura',
  })
  description: string;


  @IsNumber() 
  @IsPositive()
  @ApiProperty({
    description: 'Avaliação do anime',
    example: 9.5,
  })
  avaliation: number;


  @IsUrl()
  @ApiProperty({
    description: 'Imagem do anime',
    example:
      'https://lunetas.com.br/wp-content/uploads/2022/04/animes-e-criancas-portal-lunetas.jpg.webp',
  })
  image: string;
}
