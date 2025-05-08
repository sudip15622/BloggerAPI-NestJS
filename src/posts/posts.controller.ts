import { Controller, Get, Param, ParseIntPipe, Body, Post, Patch, Delete, Query, UseGuards } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { PostsService } from "./posts.service";
import { PostInterface } from "./interfaces";
import { CreatePostDto, UpdatePostDto, FilterPostDto } from "./dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { RolesGuard } from "src/users/roles.guard";


@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Public()
    @Get()
    async findAllPosts(@Query() filters: FilterPostDto): Promise<PostInterface[]> {
        const definedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== undefined)
        );
        return this.postsService.findAllPosts(definedFilters);
    }

    @Public()
    @Get(":id")
    async findPost(@Param("id") id: string) {
        return this.postsService.findPost(id);
    }

    @Post()
    async createPost(@Body() details: CreatePostDto): Promise<PostInterface> {
        return this.postsService.createPost(details);
    }

    @Public()
    @Patch(":id")
    async updatePost(@Param("id") id: string, @Body() details: UpdatePostDto): Promise<PostInterface> {
        return this.postsService.updatePost(id, details);
    }
    
    @UseGuards(RolesGuard)
    @Roles("admin")
    @Delete(":id")
    async deletePost(@Param("id") id: string): Promise<PostInterface> {
        return this.postsService.deletePost(id);
    }
}