import z from "zod";

export const createFavoriteSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(300),
  slug: z
    .string()
    .min(2)
    .max(30)
    .regex(/^\/[a-z0-9-]+$/),
  cover: z.string().url(),
  category: z.string().min(1)
});

export type CreateFavoriteInput = z.TypeOf<typeof createFavoriteSchema>;

export const getFavoriteByCategorySchemma = z.object({
  category: z.string().min(1),
  cursor: z.number().nullish(),
  limit: z.number().min(1).nullish()
});

export type GetFavoriteByCategoryInput = z.TypeOf<typeof getFavoriteByCategorySchemma>;
