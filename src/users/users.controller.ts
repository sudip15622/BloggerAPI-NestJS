import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma, Role, User } from "@prisma/client";
import { ZodValidationPipe } from "src/common/pipes/zod-valdation.pipe";
import { RoleBasedAuthGuard } from "./roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import {CreateUserSchema, CreateUserType, UpdateUserSchema, UpdateUserType, QueryUserSchema, QueryUserType} from "./schemas"

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(RoleBasedAuthGuard)
    @Roles(Role.admin)
    @UsePipes(new ZodValidationPipe(QueryUserSchema))
    @Get()
    async findAllUsers(
        @Query() queries: QueryUserType
    ): Promise<User[]> {
        return this.usersService.findAllUsers(queries);
    }


    @UseGuards(RoleBasedAuthGuard)
    @Roles(Role.admin)
    @Get(":id")
    async findUser(@Param("id") id: string): Promise<User | null> {
        return this.usersService.findUser({ id: id })
    }

    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    @Post()
    async createUser(@Body() data: CreateUserType): Promise<User> {
        return this.usersService.createUser(data);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ZodValidationPipe(UpdateUserSchema))
    @Patch(":id")
    async updateUser(@Param("id") id: string, @Body() data: UpdateUserType): Promise<User> {
        return this.usersService.updateUser({
            where: { id: id },
            data: { ...data }
        });
    }

    @UseGuards(RoleBasedAuthGuard)
    @Roles(Role.admin)
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<User> {
        return this.usersService.deleteUser({id: id})
    }

}