import { Injectable } from '@nestjs/common';
import { GetAuthorArgs } from './dto/get-author.args';

@Injectable()
export class AuthorService {
  findOneById(id: number) {
    return null;
  }

  findOneByArgs(args:GetAuthorArgs) {
    return null;
  }

}
