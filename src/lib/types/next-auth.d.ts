import NextAuth, { DefaultSession } from "next-auth";
import { $Enums } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      handle: string | null;
      membership: $Enums.MembershipEnum;
    } & DefaultSession["user"];
  }
}
