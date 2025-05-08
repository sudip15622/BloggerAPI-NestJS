
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor (private prisma: PrismaService) {}

  // private readonly users: UserInterface[] = [
  //   {
  //     id: "1",
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     id: "2",
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {...data}
    });
  }
}
