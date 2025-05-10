import { Body, Controller, Get, Param, Post, UsePipes } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma, User } from "@prisma/client";
// import { Public } from "src/common/decorators/public.decorator";
import { ZodValidationPipe } from "src/common/pipes/zod-valdation.pipe";
import { CreateUserSchema, CreateUserType } from "./schemas/create-user.schema";

@Controller("users") 
export class UsersController {
    constructor (private usersService: UsersService) {}

    // @Public()
    @Get()
    async findAllUsers(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    // @Public()
    @Get(":id")
    async findUser(@Param("id") id: string): Promise<User | null> {
        return this.usersService.findUser({id: id})
    }

    // @Public()
    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    @Post()
    async createUser(@Body() data: CreateUserType): Promise<User> {
        return this.usersService.createUser(data);
    }
}