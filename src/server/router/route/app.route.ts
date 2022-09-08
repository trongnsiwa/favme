import { createRouter } from "../createRouter";
import { categoryRouter } from "./category.route";

export const appRouter = createRouter().merge("categories.", categoryRouter);

export type AppRouter = typeof appRouter;
