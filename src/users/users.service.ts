
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';



@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAllUsers(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.UserWhereUniqueInput,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput
  }): Promise<User[]> {
    const {skip, take, cursor, where, orderBy} = params;
    return await this.prisma.user.findMany({
      skip: skip,
      take: take,
      cursor: cursor,
      where: where,
      orderBy: orderBy
    });
  }

  async findUser(uniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: uniqueInput
    })
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const { password, ...rest } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prisma.user.create({
      data: { ...rest, password: hashedPassword }
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput,
    data: Omit<Prisma.UserUpdateInput, "id">
  }): Promise<User> {
    const { where, data } = params;
    return await this.prisma.user.update({
      where: where,
      data: data
    })
  }

  async deleteUser(uniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({
      where: uniqueInput
    })
  }
}
