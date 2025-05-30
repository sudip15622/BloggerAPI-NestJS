import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Book as PrismaBook } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getBookById(
    uniqueInput: Prisma.BookWhereUniqueInput,
  ): Promise<PrismaBook | null> {
    return await this.prisma.book.findUnique({
      where: uniqueInput,
    });
  }

  async createBook(data: Prisma.BookCreateInput): Promise<PrismaBook> {
    return await this.prisma.book.create({
      data: data
    });
  }

  async getBooksByAuthor(input: Prisma.BookWhereInput): Promise<PrismaBook[]> {
    return await this.prisma.book.findMany({
      where: input,
    });
  }
}
