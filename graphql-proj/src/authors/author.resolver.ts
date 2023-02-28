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
import { GetAuthorArgs } from './dto/get-author.args';
import { Author } from './models/author.model';
import { Post } from './models/post.model';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorService,
    private postsService: PostService,
  ) {}

  @Query((returns) => Author, { name: 'author' })
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query((returns) => Author, { name: 'author' })
  async getAuthorDto(@Args() args: GetAuthorArgs) {
    return this.authorsService.findOneByArgs(args);
  }

  @ResolveField('posts', (returns) => [Post])
  async getPosts(@Parent() author: Author) {
    const { id } = author;
    return this.postsService.findAll({ authorId: id });
  }
}
