import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'Email do usuário dono do perfil',
    example: 'usuario@usuario.com.br',
  })
  userEmail: string;

  @IsArray()
  @ApiProperty({
    description: 'Lista de filmes que foram adicionados ao perfil',
    example:
      '["5ff8f7ab-6947-4627-966f-e33e3d38f84c", "cccf6a09-62c7-46a1-810d-54d0ca22d2a9"]',
  })
  movie: string[];

  @IsArray()
  @ApiProperty({
    description: 'Lista de series que foram adicionadas ao perfil',
    example:
      '["fb944e32-8b77-48b2-984e-b4e8d80eaee4", "9a2c236f-f1a7-42e9-9572-c7be0674151a"]',
  })
  serie: string[];

  @IsArray()
  @ApiProperty({
    description: 'Lista de animes que foram adicionados ao perfil',
    example:
      '["dd431533-f3bb-4958-924c-431463ad72da", "f4f4f299-5ff4-4a43-bc10-9523d49a291f"]',
  })
  anime: string[];
}
