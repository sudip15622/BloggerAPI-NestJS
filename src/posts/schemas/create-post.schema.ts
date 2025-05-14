import {z} from "zod";

export const CreatePostSchema = z.object({
    title: z.string().min(1, {message: "Title is required!"}),
    description: z.string().min(1, {message: "Description is required!"}).optional(),
})

export type CreatePostType = z.infer<typeof CreatePostSchema>