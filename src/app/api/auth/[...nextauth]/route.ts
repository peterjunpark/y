import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const authOptions: NextAuthOptions = {
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
