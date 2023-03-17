import { Exception } from './exceptions';

export class Exceptions {
  constructor(
    public readonly exception: Exception,
    public readonly message?: string,
  ) {}
}