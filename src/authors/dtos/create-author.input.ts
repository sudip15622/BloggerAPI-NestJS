import { InputType, Field } from '@nestjs/graphql';
import { CustomEmailScalar } from 'src/common/scalars/email.scalar';

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;

  @Field(type => CustomEmailScalar)
  email: string;
}