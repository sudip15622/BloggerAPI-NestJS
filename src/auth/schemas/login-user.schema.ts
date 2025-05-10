import { z } from "zod";

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }).max(20, { message: 'Password must be at most 20 characters long.' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' }),
})

export type LoginUserType = z.infer<typeof LoginUserSchema>;