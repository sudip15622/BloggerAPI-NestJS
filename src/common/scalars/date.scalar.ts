import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { format, parse } from 'date-fns';

@Scalar('CustomDate')
export class CustomDateScalar implements CustomScalar<string, Date | null> {
  description = 'Custom date scalar type (format: MMM dd, yyyy)';

  parseValue(value: string): Date {
    return new Date(value); // Convert incoming string to Date
  }

  serialize(value: Date): string {
    return format(value, 'MMM dd, yyyy'); // Convert Date to formatted string
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return parse(ast.value, 'MMM dd, yyyy', new Date());
    }
    return null;
  }
}