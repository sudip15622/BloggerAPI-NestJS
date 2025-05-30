import { Module } from '@nestjs/common';
import { PUB_SUB } from 'src/constants';
import { PubSub } from 'graphql-subscriptions';
import { CustomEmailScalar } from '../scalars/email.scalar';
import { CustomDateScalar } from '../scalars/date.scalar';

@Module({
  providers: [
    CustomEmailScalar,
    CustomDateScalar,
    {
      provide: PUB_SUB,
      useValue: new PubSub(),
    },
  ],
  exports: [PUB_SUB, CustomEmailScalar, CustomDateScalar],
})
export class CommonModule {}
