import { Controller, Get, Param, ParseIntPipe, Body, Post, Patch, Delete, Query, UseGuards } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { PostsService } from "./posts.service";
import { PostInterface } from "./interfaces";
import { CreatePostDto, UpdatePostDto, FilterPostDto } from "./dto";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "@prisma/client";
import { RoleBasedAuthGuard } from "src/users/roles.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


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

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(@Body() details: CreatePostDto): Promise<PostInterface> {
        return this.postsService.createPost(details);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updatePost(@Param("id") id: string, @Body() details: UpdatePostDto): Promise<PostInterface> {
        return this.postsService.updatePost(id, details);
    }


    @UseGuards(RoleBasedAuthGuard)
    @Roles(Role.admin)
    @Delete(":id")
    async deletePost(@Param("id") id: string): Promise<PostInterface> {
        return this.postsService.deletePost(id);
    }
}