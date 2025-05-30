import {
  Resolver,
  Query,
  Int,
  ResolveField,
  Parent,
  Args,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { Author, Comment } from './models';
import { AuthorsService } from './authors.service';
import { BooksService } from './books.service';
import { CreateAuthorInput } from './dtos/create-author.input';
import { PUB_SUB } from 'src/constants';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';


@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => Author, { nullable: true })
  async getAuthor(@Args('id') id: string) {
    return this.authorsService.getAuthorById({ id: id });
  }

  @Query(()=> [Author])
  async getAllAuthors(): Promise<Author[]> {
    return await this.authorsService.getllAuthors();
  }

  @Mutation(() => Author)
  async createAuthor(
    @Args('input') input: CreateAuthorInput,
  ) {
    return this.authorsService.createAuthor(input);
  }

  @ResolveField()
  async books(@Parent() author: Author) {
    const { id } = author;
    return this.booksService.getBooksByAuthor({ authorId: id });
  }

  @Subscription(() => Comment, {
    name: 'commentAdded',
    filter: (payload: {commentAdded: Comment}, variables) =>
    payload.commentAdded.bookId === variables.bookId,
  })
  subscribeToCommentAdded(@Args("bookId") bookId: string) {
    return this.pubSub.asyncIterableIterator('commentAdded');
  }
}
