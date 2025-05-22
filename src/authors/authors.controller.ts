import { Controller, Get } from "@nestjs/common";
import { AuthorsService } from "./authors.service";

@Controller()
export class AuthorsController {
    constructor(private authorsService: AuthorsService) { }

    @Get()
    async getAuthor(id: number): Promise<object | undefined> {
        return this.authorsService.getAuthor(id);
    }
}