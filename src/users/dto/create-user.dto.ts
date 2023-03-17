import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Mateus Jacinto Santiago',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'CPF',
    example: '00000000000',
  })
  cpf: string;

  @IsString()
  @ApiProperty({
    description: 'Email',
    example: 'usuario@usuario.com.br',
  })
  email: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Idade',
    example: 32,
  })
  idade: number;

  @IsString()
  @ApiProperty({
    description: 'Permissão de acesso',
  })
  role: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'secret',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'confirmação da senha',
    example: 'secret',
  })
  confirmPassword: string;
}
