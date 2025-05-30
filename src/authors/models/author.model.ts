
import { Field, Int, ObjectType, Directive } from '@nestjs/graphql';
import { Book } from './book.model';
import { CustomEmailScalar } from 'src/common/scalars/email.scalar';
import { CustomDateScalar } from 'src/common/scalars/date.scalar';


@ObjectType()
export class Author {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(()=> CustomEmailScalar)
  email: string;

  @Field(type => [Book], {nullable: "itemsAndList"})
  books?: Book[];

  // format example: Jan 20, 2025
  @Directive('@date(format: "MMM dd, yyyy")')
  @Field(type => CustomDateScalar)
  updatedAt: Date; 

  @Directive('@date(format: "MMM dd, yyyy")')
  @Field(type => CustomDateScalar)
  createdAt: Date; 
}
