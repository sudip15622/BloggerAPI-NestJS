import {
  Resolver,
  Query,
  Int,
  Args,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Book, Author, Comment } from './models';
import { CreateBookInput, CreateCommentInput } from './dtos';
import { BooksService } from './books.service';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/constants';
import { CommentsService } from './comments.service';
import { Inject } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private booksService: BooksService,
    private commentsService: CommentsService,
    private authorsService: AuthorsService,
    @Inject(PUB_SUB) private pubSub: PubSub,
  ) {}

  @Query(() => Book, { nullable: true })
  async getBook(@Args('id') id: string) {
    return await this.booksService.getBookById({ id: id });
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput) {
    return this.booksService.createBook(input);
  }

  @ResolveField()
  async author(@Parent() book: Book) {
    const { authorId } = book;
    return this.authorsService.getAuthorById({ id: authorId });
  }

  @Mutation(() => Comment)
  async addComment(@Args('input') input: CreateCommentInput) {
    const newComment = await this.commentsService.addComment(input.bookId, {
      commentText: input.commentText,
    });
    await this.pubSub.publish('commentAdded', { commentAdded: newComment });
    return newComment;
  }
}
