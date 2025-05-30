
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field()
  id: string;

  @Field()
  commentText: string;

  @Field({nullable: true})
  bookId?: string;
}
