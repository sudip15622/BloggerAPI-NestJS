import { Injectable } from "@nestjs/common";
import { Book } from "./models/book.model";

@Injectable()
export class BooksService {
    private books = [
        {
            id: 1,
            title: "Hello world",
            description: "This book is saying hello world.",
            authorId: 1
        },
        {
            id: 2,
            title: "Guithey Muji",
            description: "Hello everyone, this is guithey muji",
            authorId: 2
        }
    ]
    async getBook(id: number): Promise<object | undefined> {
        return this.books.find(book => book.id === id);
    }

    async getAllBooksByAuthor(author: {id: number}): Promise<Book[]>{
        return this.books.filter(book => book.authorId === author.id);
    }
}