import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user-entity';
import { exceptionhandling } from 'src/utils/exceptions/exceptionhandling';
import { AuthService } from './auth.service';
import { IsTeacherAuthorization } from './decorators/is.teacher.decorator';
import { LoggedUser } from './decorators/user.logged.decorator';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  
  @HttpCode(HttpStatus.OK)
   @ApiOperation({
    summary: 'Login de usuário',
  })  
  @Post()
  login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    try {
      return this.service.login(dto)
    } catch (err) {
      exceptionhandling(err)
    }
  }

  @ApiOperation({
    summary: "Retorna o usuário que está autenticado"
  })
  @UseGuards(AuthGuard(), IsTeacherAuthorization)
  @ApiBearerAuth()
  @Get()  
  profile(@LoggedUser() user: UserEntity) {
    return user;
  }
  
}

