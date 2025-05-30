import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from './comment.model';
import { Author } from './author.model';

@ObjectType()
export class Book {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field((type) => Int, { nullable: true })
  votes?: number;

  @Field({ nullable: true })
  authorId?: string;

  @Field(type => Author, { nullable: true })
  author?: Author;

  @Field((type) => [Comment])
  comments: Comment[];

  
}
