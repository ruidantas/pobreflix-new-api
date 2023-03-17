export enum Exception {
    InvalidData,
    DatabaseException,
    NotFoundData,
    UnauthorizedException,
    NotFoundException,
    UnprocessableEntityException,
  }
  
  export interface IException {
    message?: string;
    exception: Exception;
  }
  