import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/configs/prisma";
import { AuthenticationError } from "@/configs/errors";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials) {
          const availableUser = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });

          if (!availableUser) {
            throw new Error("email is not registered");
          }

          if (availableUser?.password !== credentials?.password) {
            throw new Error("incorrect password");
          }

          return availableUser;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const availableUser = await prisma.user.findFirst({
        where: {
          email: token.email as string,
        },
      });

      if (!availableUser) {
        throw new Error("no user with email found");
      }

      return {
        id: availableUser.id,
        name: availableUser.name,
        email: availableUser.email,
      };
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies AuthOptions;

export async function checkPermission() {
  const session = await getServerSession(authConfig);
  if (!session) throw new AuthenticationError();
  return session;
}
