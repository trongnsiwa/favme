import { getLabelByFavoriteSchema } from "src/schemas/label.schema";
import { createRouter } from "../createRouter";

export const labelRouter = createRouter()
  .query("labels", {
    resolve({ ctx }) {
      return ctx.prisma.label.findMany({
        where: {
          creatorId: ctx.session?.user?._id
        },
        orderBy: {
          name: "asc"
        }
      });
    }
  })
  .query("favorite-labels", {
    input: getLabelByFavoriteSchema,
    resolve({ ctx, input }) {
      return ctx.prisma.label.findMany({
        where: {
          creatorId: ctx.session?.user?._id,
          favorites: {
            some: {
              id: input.favoriteId
            }
          }
        },
        orderBy: {
          name: "asc"
        }
      });
    }
  });
