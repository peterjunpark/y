import { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import KakaoProvider from "next-auth/providers/kakao";
import OsuProvider from "next-auth/providers/osu";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
    OsuProvider({
      clientId: process.env.OSU_ID!,
      clientSecret: process.env.OSU_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    async session({ session, user }) {
      const userDetails = await prisma.user.findUnique({
        where: { id: user.id },
        select: { handle: true, membership: true },
      });

      session.user = {
        ...session.user,
        id: user.id,
        handle: userDetails?.handle!,
        membership: userDetails?.membership!,
      };

      return session;
    },
  },
};
