import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty({
    description: 'Titulo do filme',
    example: 'Piratas do caribe',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do filme',
    example: 'Filme de ação e muita aventura',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Avaliação do filme',
    example: 9.5,
  })
  avaliation: number;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do filme',
    example:
      'https://observatoriodocinema.uol.com.br/wp-content/uploads/2020/04/Johnny_Depp_Pirates_of_the_Caribbean_Dead_Men_Tell_521035_3840x2160.jpg',
  })
  image: string;
}
