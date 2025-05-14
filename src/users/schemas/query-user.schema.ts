// find-all-users.zod.ts
import { z } from 'zod';

export const QueryUserSchema = z.object({
  skip: z.coerce.number().int().nonnegative().optional(),
  take: z.coerce.number().int().positive().optional(),
  cursor: z
    .string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        throw new Error('Invalid cursor JSON');
      }
    })
    .optional(),
  where: z
    .string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        throw new Error('Invalid where JSON');
      }
    })
    .optional(),
  orderBy: z
    .string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        throw new Error('Invalid orderBy JSON');
      }
    })
    .optional(),
});

export type QueryUserType = z.infer<typeof QueryUserSchema>;
