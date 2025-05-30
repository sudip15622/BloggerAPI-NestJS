import { Controller, Get, Param, UsePipes, Body, Post, Patch, Delete, Query, UseGuards, Req, Request } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { Post as PostModule } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ZodValidationPipe } from "src/common/pipes/zod-valdation.pipe";
import { CreatePostSchema, CreatePostType, UpdatePostSchema, UpdatePostType, QueryPostSchema, QueryPostType } from "./schemas";
// import { RequestInterface } from "src/auth/interfaces/request.interface";
import { RequestInterface, UserInterface } from "src/auth/interfaces";
import { GetUser } from "src/common/decorators/user.decorator";


@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) { }

    @UsePipes(new ZodValidationPipe(QueryPostSchema))
    @Get()
    async findAllPosts(
        @Query() queries: QueryPostType
    ): Promise<PostModule[]> {
        return await this.postsService.findAllPosts(queries);
    }

    @Get(":id")
    async findPost(@Param("id") id: string): Promise<PostModule | null> {
        return await this.postsService.findPost({ id: id })
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(
        @GetUser() user: UserInterface,
        @Body(new ZodValidationPipe(CreatePostSchema)) data: CreatePostType,
    ): Promise<PostModule> {
        // const user = {id: req.user.id}
        return await this.postsService.createPost(data, {id: user.id});
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ZodValidationPipe(UpdatePostSchema))
    @Patch(":id")
    async updatePost(@Param("id") id: string, @Body() data: UpdatePostType): Promise<PostModule> {
        return await this.postsService.updatePost({
            where: { id: id },
            data: { ...data }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deletePost(@Param("id") id: string): Promise<PostModule> {
        return await this.postsService.deletePost({ id: id })
    }
}