import { CreateUserSchema } from "./create-user.schema";
import {z} from "zod";

export const UpdateUserSchema = CreateUserSchema.partial()

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;