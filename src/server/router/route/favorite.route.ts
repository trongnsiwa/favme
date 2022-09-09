import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {
  changeStatusSchema,
  createFavoriteSchema,
  getFavoriteByCategorySchemma
} from "./../../../schemas/favorite.schema";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";

export const favoriteRouter = createRouter()
  .mutation("create-favorite", {
    input: createFavoriteSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session || !ctx.session?.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Can not create a category while logged out"
        });
      }

      try {
        const category = await ctx.prisma.favorite.create({
          data: {
            ...input,
            creator: {
              connect: {
                id: ctx.session?.user?._id
              }
            },
            category: {
              connect: {
                id: input.category
              }
            }
          }
        });

        return category;
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "Favorite already exists"
            });
          }
        }

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong"
        });
      }
    }
  })
  .query("get-favorites", {
    input: getFavoriteByCategorySchemma,
    async resolve({ ctx, input }) {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const favorites = await ctx.prisma.favorite.findMany({
        where: {
          category: {
            slug: input.category
          }
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor.toString() } : undefined,
        include: {
          category: true
        }
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (favorites.length > limit) {
        const nextItem = favorites.pop();
        nextCursor = parseInt(nextItem!.id as string, 10);
      }
      return {
        favorites,
        nextCursor
      };
    }
  })
  .mutation("change-status", {
    input: changeStatusSchema,
    async resolve({ ctx, input }) {
      const category = await ctx.prisma.favorite.update({
        where: {
          id: input.id
        },
        data: {
          status: input.status
        }
      });

      return category;
    }
  });
