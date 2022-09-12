import { favoriteRouter } from "./favorite.route";
import { createRouter } from "../createRouter";
import { categoryRouter } from "./category.route";
import { labelRouter } from "./label.route";
import { authRouter } from "./auth.route";

export const appRouter = createRouter()
  .merge("auth.", authRouter)
  .merge("categories.", categoryRouter)
  .merge("favorites.", favoriteRouter)
  .merge("labels.", labelRouter);

export type AppRouter = typeof appRouter;
