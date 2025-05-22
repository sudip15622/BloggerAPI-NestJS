import { z } from "zod";

export const CreatePostSchema = z.object({
    title: z.string({ required_error: "Title is required!" })
        .min(1, { message: "Title cannot be empty!" }),
    description: z.string().min(1, { message: "Description cannot be empty!" }).optional()
}).strict();

export type CreatePostType = z.infer<typeof CreatePostSchema>