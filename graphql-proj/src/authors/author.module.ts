import { Module } from '@nestjs/common';
import { PostModule } from 'src/posts/post.module';
import { AuthorsResolver } from './author.resolver';
import { AuthorService } from './author.service';

@Module({
  imports: [PostModule],
  providers: [AuthorService, AuthorsResolver],
})
export class AuthorsModule {}
