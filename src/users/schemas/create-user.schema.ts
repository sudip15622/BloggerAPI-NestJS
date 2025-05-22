
import { z } from 'zod';

export const CreateUserSchema = z
    .object({
        name: z.string().regex(/^[A-Za-z]+( [A-Za-z]+)*$/, { message: 'Name must contain only letters and spaces.' }),
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }).max(20, { message: 'Password must be at most 20 characters long.' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),
        image: z.string().optional(),
    }).strict();

export type CreateUserType = z.infer<typeof CreateUserSchema>;
