import { Injectable } from '@nestjs/common';
import { GetAuthorArgs } from './dto/get-author.args';
import { Author } from './models/author.model';

@Injectable()
export class AuthorService {
  private authorsList: Author[] = [
    { id: 1, firstName: 'Ernesto', lastName: 'Sabato', posts: [] },
  ];
  findOneById(id: number):Author {
    return this.authorsList.find((a) => a.id === id);
  }

  findOneByArgs(args: GetAuthorArgs) {
    return null;
  }
}
