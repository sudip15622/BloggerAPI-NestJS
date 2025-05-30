import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Author as PrismaAuthor } from "@prisma/client";

@Injectable()
export class AuthorsService {
    constructor (private prisma: PrismaService) {}

    async getllAuthors (): Promise<PrismaAuthor[]> {
        return await this.prisma.author.findMany();
    }

    async getAuthorById(uniqueInput: Prisma.AuthorWhereUniqueInput): Promise<PrismaAuthor | null> {
        return await this.prisma.author.findUnique({
            where: uniqueInput
        })
    }

    async createAuthor(data: Prisma.AuthorCreateInput): Promise<PrismaAuthor> {
        return await this.prisma.author.create({
            data: data
        })
    }
}