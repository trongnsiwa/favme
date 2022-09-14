import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GooglepProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user._id = user.id;
        // session.user.email = user.email;
      }
      return session;
    }
    //  async signIn({account, profile}) {

    //       if (account.provider === "google") {

    //         console.log({
    //           verified: profile.email_verified,
    //           name: profile.given_name,
    //           email: profile.email,
    //           lastName: profile.family_name
    //         });
    //         return true;
    //       }
    //       return true;
    // }
  },

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    // EmailProvider({
    //   server: env.EMAIL_SERVER,
    //   from: env.EMAIL_FROM
    // }),
    // GooglepProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET
    // }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET
    // }),
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET
    })
    // ...add more providers here
  ],
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(authOptions);
