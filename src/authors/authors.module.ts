import { Module } from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { AuthorsController } from "./authors.controller";
import { BooksModule } from "src/books/books.module";
import { AuthorsResolver } from "./authors.resolver";

@Module ({
    imports: [BooksModule],
    controllers: [AuthorsController],
    providers: [AuthorsService, AuthorsResolver],
    // exports: [AuthorsService]
})
export class AuthorsModule {}