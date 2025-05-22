import { Resolver, Query, ResolveField, Args, Parent, Int } from "@nestjs/graphql";
import { Author } from "./models/author.model";
import { BooksService } from "src/books/books.service";
import { AuthorsService } from "./authors.service";
import { Book } from "src/books/models/book.model";


@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
  ) {}

  @Query(() => Author)
  async getAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.getAuthor(id);
  }

  @ResolveField(() => [Book])
  async getAllBooksByAuthor(@Parent() author: Author) {
    const { id } = author;
    return this.booksService.getAllBooksByAuthor({ id: id });
  }
}
