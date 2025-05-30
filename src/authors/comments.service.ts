import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Comment as PrismaComment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getCommentById(
    uniqueInput: Prisma.CommentWhereUniqueInput,
  ): Promise<PrismaComment | null> {
    return await this.prisma.comment.findUnique({
      where: uniqueInput,
    });
  }

  async addComment (
    bookId: string,
    data: Prisma.CommentCreateInput
  ): Promise<PrismaComment> {
    return await this.prisma.comment.create({
        data: {
            commentText: data.commentText,
            book: {
                connect: {
                    id: bookId
                }
            }
        }
    })
  }
}
