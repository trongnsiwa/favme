import { z } from "zod";

export const getLabelByFavoriteSchema = z.object({
  favoriteId: z.string()
});
