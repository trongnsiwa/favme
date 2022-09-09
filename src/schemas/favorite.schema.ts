import z from "zod";

export const createFavoriteSchema = z.object({
  name: z.string().min(2, "Too short!").max(100, "Too long!"),
  description: z.string().min(5, "Too short!").max(300, "Too long!"),
  slug: z
    .string()
    .min(2, "Too short!")
    .max(30, "Too long!")
    .regex(/^\/[a-z0-9-]+$/, 'Slug must start with "/", lowercase, numbers and dashes only'),
  cover: z.string().url(),
  category: z.string().min(1, "Required")
});

export type CreateFavoriteInput = z.TypeOf<typeof createFavoriteSchema>;
