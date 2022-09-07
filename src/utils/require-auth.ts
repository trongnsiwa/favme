import { authOptions } from "./../pages/api/auth/[...nextauth]";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";

export const requireAuth = (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login", // login path
        permanent: false
      }
    };
  }

  return await func(ctx);
};
