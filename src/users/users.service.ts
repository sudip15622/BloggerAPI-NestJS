
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';



@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });

    if(!user){
      throw new BadRequestException(`Cannot find user with ${userWhereUniqueInput}`)
    }
    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const {password, ...rest} = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: { ...rest, password: hashedPassword}
    });
  }
}
