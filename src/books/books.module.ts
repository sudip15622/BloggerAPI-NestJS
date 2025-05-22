import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";

@Module ({
    providers: [BooksService],
    exports: [BooksService]
})
export class BooksModule {}