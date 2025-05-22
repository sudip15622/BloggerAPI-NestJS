import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorsService {

    private authors = [
        {
            id: 1,
            firstName: "Sudip",
            lastName: "Lamichhane",
            books: [
                {
                    id: 1,
                    title: "Hello world",
                    description: "This book is saying hello world."
                }
            ]
        },
        {
            id: 2,
            firstName: "Maddat",
            lastName: "Subedi",
            books: [
                {
                    id: 2,
                    title: "Guithey Muji",
                    description: "Hello everyone, this is guithey muji"
                }
            ]
        }
    ]

    async getAuthor(id:number): Promise<object| undefined> {
        return this.authors.find(author => author.id === id)
    }
}