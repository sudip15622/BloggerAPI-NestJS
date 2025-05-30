import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { BooksService } from './books.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorsResolver } from './authors.resolver';
import { BooksResolver } from './books.resolver';
import { CommentsService } from './comments.service';
import { CommonModule } from 'src/common/modules/common.module';

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [
    AuthorsResolver,
    BooksResolver,
    AuthorsService,
    BooksService,
    CommentsService,
  ],
})
export class AuthorsModule {}
