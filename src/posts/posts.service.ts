import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Post as PostModule, Prisma } from "@prisma/client";

@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) { }


    async findAllPosts(params: {
        skip?: number,
        take?: number,
        cursor?: Prisma.PostWhereUniqueInput,
        where?: Prisma.PostWhereInput,
        orderBy?: Prisma.PostOrderByWithRelationInput
    }): Promise<PostModule[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return await this.prisma.post.findMany({
            skip: skip,
            take: take,
            cursor: cursor,
            where: where,
            orderBy: orderBy
        });
    }

    async findPost(uniqueInput: Prisma.PostWhereUniqueInput): Promise<PostModule | null> {
        return await this.prisma.post.findUnique({
            where: uniqueInput
        })
    }

    async createPost(data: Prisma.PostCreateInput, user: Prisma.UserWhereUniqueInput): Promise<PostModule> {
        return await this.prisma.post.create({
            data: {
                ...data,
                user: {
                    connect: user
                }
            },
        })
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput,
        data: Omit<Prisma.PostUpdateInput, "id">
    }): Promise<PostModule> {
        const { where, data } = params;
        return await this.prisma.post.update({
            where: where,
            data: data
        })
    }

    async deletePost(uniqueInput: Prisma.PostWhereUniqueInput): Promise<PostModule> {
        return await this.prisma.post.delete({
          where: uniqueInput
        })
      }
}