import { authOptions } from "./../../pages/api/auth/[...nextauth]";
// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../db/client";

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    req,
    res,
    session,
    prisma
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
