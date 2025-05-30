import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  commentText: string;

  @Field()
  bookId: string;
}