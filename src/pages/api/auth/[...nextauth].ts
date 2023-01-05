import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "~/env/server.mjs";
import { prisma } from "~/server/db/client";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, profile }) {
      await prisma.user.upsert({
        where: {
          id: user.id,
        },
        update: {
          // needed since the type def for profile doesn't include image_url returned by Discord
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          image: profile?.image_url,
        },
        create: user,
      });
      return true;
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
