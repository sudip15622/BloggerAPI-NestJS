import { Controller, Get, Param, ParseIntPipe, Body, Post, Patch, Delete, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostInterface } from "interfaces/interfaces";
import { CreatePostDto, UpdatePostDto, FilterPostDto } from "dtos/dtos";


@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Get()
    async findAllPosts(@Query() filters: FilterPostDto): Promise<PostInterface[]> {
        const definedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== undefined)
        );
        return this.postsService.findAllPosts(definedFilters);
    }

    @Get(":id")
    async findPost(@Param("id") id: string) {
        return this.postsService.findPost(id);
    }

    @Post()
    async createPost(@Body() details: CreatePostDto): Promise<PostInterface> {
        return this.postsService.createPost(details);
    }

    @Patch(":id")
    async updatePost(@Param("id") id: string, @Body() details: UpdatePostDto): Promise<PostInterface> {
        return this.postsService.updatePost(id, details);
    }

    @Delete(":id")
    async deletePost(@Param("id") id: string): Promise<PostInterface> {
        return this.postsService.deletePost(id);
    }
}