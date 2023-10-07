import { type NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { db } from "./drizzle";
import { eq } from "drizzle-orm";
import { users } from "./schema/users";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      const handle = await db
        .select({ handle: users.handle })
        .from(users)
        .where(eq(users.id, user.id));

      if (handle.length > 0) {
        session.user = {
          ...session.user,
          id: user.id,
          handle: handle[0].handle,
        };
      }
      return session;
    },
  },
};
