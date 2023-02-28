import {
  Resolver,
  ResolveField,
  Args,
  Int,
  Parent,
  Query,
} from '@nestjs/graphql';
import { PostService } from 'src/posts/post.service';
import { AuthorService } from './author.service';
import { Author } from './models/author.model';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorService,
    private postsService: PostService,
  ) {}

  @Query((returns) => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}
