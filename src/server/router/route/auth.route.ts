import { hash } from "argon2";
import { signUpSchema } from "src/schemas/auth.schema";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";

export const authRouter = createRouter();
// .mutation("signup", {
//   input: signUpSchema,
//   resolve: async ({ input, ctx }) => {
//     const { email, password } = input;

//     const exists = await ctx.prisma.user.findFirst({
//       where: { email }
//     });

//     if (exists) {
//       throw new trpc.TRPCError({
//         code: "CONFLICT",
//         message: "User already exists."
//       });
//     }

//     const hashedPassword = await hash(password);

//     const result = await ctx.prisma.user.create({
//       data: { email, password: hashedPassword }
//     });

//     return {
//       status: 201,
//       message: "Account created successfully",
//       result: result.email
//     };
//   }
// });
