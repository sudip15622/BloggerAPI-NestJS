import {z} from "zod";
import { CreatePostSchema } from "./create-post.schema";

export const UpdatePostSchema = CreatePostSchema.partial();

export type UpdatePostType = z.infer<typeof UpdatePostSchema>