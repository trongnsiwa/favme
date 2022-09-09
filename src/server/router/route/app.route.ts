import { favoriteRouter } from "./favorite.route";
import { createRouter } from "../createRouter";
import { categoryRouter } from "./category.route";

export const appRouter = createRouter()
  .merge("categories.", categoryRouter)
  .merge("favorites.", favoriteRouter);

export type AppRouter = typeof appRouter;
