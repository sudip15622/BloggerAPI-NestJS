// email.scalar.ts
import { Scalar, CustomScalar } from "@nestjs/graphql";
import { ValueNode, Kind } from "graphql";

@Scalar('CustomEmail')
export class CustomEmailScalar implements CustomScalar<string, string | null> {

  description = "Custom email scalar type (uses basic email format)";

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  parseValue(value: string): string {
    if (!this.emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }
    return value.toLowerCase();
  }

  serialize(value: string): string {
    return this.parseValue(value);
  }

  parseLiteral(ast: ValueNode): string | null {
    if (ast.kind === Kind.STRING) {
      return this.parseValue(ast.value);
    }
    return null;
  }
}

// export const Email = EmailScalar;
// export type Email = string;