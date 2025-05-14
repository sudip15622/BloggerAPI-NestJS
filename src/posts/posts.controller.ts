import { Controller, Get, Param, ParseIntPipe, UsePipes, Body, Post, Patch, Delete, Query, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { Post as PostModule, Role } from "@prisma/client";
import { RoleBasedAuthGuard } from "src/users/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/common/pipes/zod-valdation.pipe";
import { CreatePostSchema, CreatePostType, UpdatePostSchema, UpdatePostType, QueryPostSchema, QueryPostType } from "./schemas";


@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UsePipes(new ZodValidationPipe(QueryPostSchema))
    @Get()
    async findAllPosts(
        @Query() queries: QueryPostType
    ): Promise<PostModule[]> {
        return this.postsService.findAllPosts(queries);
    }

    @Get(":id")
    async findPost(@Param("id") id: string): Promise<PostModule | null> {
        return this.postsService.findPost({ id: id })
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ZodValidationPipe(CreatePostSchema))
    @Post()
    async createPost(@Body() data: CreatePostType): Promise<PostModule> {
        return this.postsService.createPost(data);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ZodValidationPipe(UpdatePostSchema))
    @Patch(":id")
    async updatePost(@Param("id") id: string, @Body() data: UpdatePostType): Promise<PostModule> {
        return this.postsService.updatePost({
            where: { id: id },
            data: { ...data }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deletePost(@Param("id") id: string): Promise<PostModule> {
        return this.postsService.deletePost({ id: id })
    }
}