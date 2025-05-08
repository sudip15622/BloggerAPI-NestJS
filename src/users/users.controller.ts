import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma, User } from "@prisma/client";
import { Public } from "src/common/decorators/public.decorator";

@Controller("users") 
export class UsersController {
    constructor (private usersService: UsersService) {}

    @Public()
    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Public()
    @Get(":id")
    async findUser(@Param("id") id: string): Promise<User | null> {
        return this.usersService.findUser({id: id})
    }

    @Public()
    @Post()
    async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return this.usersService.createUser(data);
    }
}