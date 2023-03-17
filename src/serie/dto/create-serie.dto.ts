import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsUrl } from 'class-validator';

export class CreateSerieDto {
  @IsString()
  @ApiProperty({
    description: 'Titulo da serie',
    example: 'O clube da meia noite',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição da serie',
    example: 'serie de suspense',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Avaliação da serie',
    example: 9.5,
  })
  avaliation: number;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem da serie',
    example:
      'https://cdn.maioresemelhores.com/imagens/melhores-series-de-suspense-da-netflix-og.jpg',
  })
  image: string;
}
