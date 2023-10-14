import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth-options";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parsePrismaError = (error: unknown) => {
  let message = "Unknown error occurred.";

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      message = "Handle already taken!";
    }

    if (error.code === "P2025") {
      message = "Record does not exist!";
    }
    return { message, code: error.code, target: error.meta!.target };
  }

  return {
    message,
    code: "Unknown Prisma error code",
    target: "Unknown Prisma error target",
  };
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return {
    id: session.user.id,
    name: session.user.name as string,
    handle: session.user.handle as string,
    image: session.user.image,
  };
};

type CountType = "likes" | "bookmarks" | "replies";
type CountParams = [CountType, CountType?, CountType?];

export function getPostIncludeParams(
  currentUserId: string,
  countsOf?: CountParams,
) {
  return {
    // Get author details.
    author: {
      select: {
        handle: true,
        membership: true,
        image: true,
        name: true,
        followers: { where: { id: currentUserId } },
      },
    },
    // Used to check if the current user has liked the post.
    likes: { where: { likerId: currentUserId } },

    // Used to check if the current user has bookmarked the post.
    bookmarks: { where: { bookmarkerId: currentUserId } },

    // Get likes and bookmarks count for the post.
    _count: countsOf
      ? {
          select: {
            likes: countsOf.includes("likes"),
            replies: countsOf.includes("replies"),
            bookmarks: countsOf.includes("bookmarks"),
          },
        }
      : undefined,
  };
}

dayjs.extend(relativeTime);

export const formatTimestamp = (timestamp: Date, diff?: "diff"): string => {
  if (diff) return dayjs(timestamp).fromNow();
  return dayjs(timestamp).format("MMM D, YYYY h:mm A");
};
