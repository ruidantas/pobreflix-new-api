import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions/exception.class';
import { Exception } from 'src/utils/exceptions/exceptions';

export class IsTeacherAuthorization implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpRequest = context.switchToHttp().getRequest()
    const request = httpRequest.user
    
      if (request?.role === 'user') {
        return true;
      }
      throw new Exceptions(Exception.UnauthorizedException);
    };
}
