import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { User } from './entities/user.entity';
import { CurrentUser } from './decorators/user-data.decorator';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll(@CurrentUser() currentUser: User) {
    console.log('post-resolver::findAll::currentUser: ', currentUser);
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id') id: string) {
    return this.postsService.findOne(id);
  }

  // Used by the gateway to resolve the user value from a post
  @ResolveField(() => User)
  user(@Parent() post: Post) {
    return {
      __typename: 'User',
      id: post.authorId,
    };
  }
}
