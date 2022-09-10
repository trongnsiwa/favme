import { FavoriteStatus } from "@prisma/client";
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
  category: z.string().min(1),
  link: z.string().url()
});

export type CreateFavoriteInput = z.TypeOf<typeof createFavoriteSchema>;

export const getFavoriteByCategorySchemma = z.object({
  category: z.string().min(1),
  cursor: z.number().nullish(),
  limit: z.number().min(1).nullish()
});

export type GetFavoriteByCategoryInput = z.TypeOf<typeof getFavoriteByCategorySchemma>;

export const changeStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum([FavoriteStatus.UNFAVORED, FavoriteStatus.FAVORED])
});

export type ChangeStatusInput = z.TypeOf<typeof changeStatusSchema>;

export const editFavoriteSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(300),
  slug: z
    .string()
    .min(2)
    .max(30)
    .regex(/^\/[a-z0-9-]+$/),
  cover: z.string().url(),
  category: z.string().min(1),
  link: z.string().url()
});

export const deleteFavoriteSchema = z.object({
  id: z.string()
});
