import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PostInterface } from "./interfaces";
import { PrismaService } from "src/prisma/prisma.service";
// import { Post, Prisma } from "@prisma/client";
// import { UUIDTypes } from "uuid";

@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) { }


    async findAllPosts(filters?: Partial<PostInterface>): Promise<PostInterface[]> {
        return await this.prisma.post.findMany({
            where: filters? filters : {},
        })
    }

    async findPost(id: string): Promise<PostInterface | null> {
        const post = await this.prisma.post.findUnique({
            where: { id: id }
        })
        if (!post) {
            throw new NotFoundException(`Cannot find post with id: ${id}`);
        }
        return post;
    }

    async createPost(data: Pick<PostInterface, "title" | "description">): Promise<PostInterface> {
        return await this.prisma.post.create({
            data: data
        })
    }

    async updatePost(id: string, data: Partial<Pick<PostInterface, "title" | "description">>): Promise<PostInterface> {
        const post = await this.prisma.post.findUnique({
            where: {id: id},
        })
        if (!post) {
            throw new NotFoundException(`Cannot find post with id: ${id}`);
        }
        return await this.prisma.post.update({
            where: {id: id},
            data: {...data}
        })
    }

    async deletePost(id: string): Promise<PostInterface> {
        const post = await this.prisma.post.findUnique({
            where: {id: id}
        });
        if (!post) {
            throw new NotFoundException(`Cannot find post with id: ${id}`);
        }
        return await this.prisma.post.delete({
            where: {id: id}
        })
    }
}