import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(url: string) {
    return {
      status: 'Servidor rodando em http://localhost:3001',
      docs: url + '/api',
    };
  }
}
