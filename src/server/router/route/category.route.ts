import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { createCategorySchema } from "src/schemas/category.schema";
import { createRouter } from "../createRouter";

export const categoryRouter = createRouter()
  .mutation("create-category", {
    input: createCategorySchema,
    async resolve({ ctx, input }) {
      if (!ctx.session || !ctx.session?.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Can not create a category while logged out"
        });
      }

      try {
        const category = await ctx.prisma.category.create({
          data: {
            ...input,
            creator: {
              connect: {
                id: ctx.session?.user?._id
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
              message: "User already exists"
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
  .query("categories", {
    resolve({ ctx }) {
      return ctx.prisma.category.findMany({
        where: {
          creatorId: ctx.session?.user?._id
        },
        orderBy: {
          name: "asc"
        }
      });
    }
  });
