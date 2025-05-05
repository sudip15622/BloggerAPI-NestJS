import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service'; // or './prisma.service' if in same folder

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // so other modules can use it
})
export class PrismaModule {}
