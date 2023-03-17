import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {

    const user = await this.prisma.user.findUnique({ where: { email } });
    if(!user) {
        throw new Exceptions(Exception.NotFoundException)
    }

    const hashValid = await compare(password, user.password)
    if(!hashValid) {
      throw new Exceptions(Exception.NotFoundData)
    }

    delete user.password;
    delete user.cpf;
    delete user.role;
    
    return {
      token: this.jwt.sign({ email }),
      user,
    }
  }
}
