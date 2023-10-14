"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

type ActionReturnType = {
  success?: "liked" | "unliked" | "bookmarked" | "unbookmarked";
  error?: { message: string; code: string; target: unknown };
};

export const handleLikeOrBookmark = async (
  formData: FormData,
): Promise<ActionReturnType | void> => {
  const currentUserId = formData.get("currentUserId")?.toString();
  const likeData = formData.get("like")?.toString();
  const unlikeData = formData.get("unlike")?.toString();
  const bookmarkData = formData.get("bookmark")?.toString();
  const unbookmarkData = formData.get("unbookmark")?.toString();

  const interactions = {
    likedPostId: likeData ? parseInt(likeData) : null,
    unlikedPostId: unlikeData ? parseInt(unlikeData) : null,
    bookmarkedPostId: bookmarkData ? parseInt(bookmarkData) : null,
    unbookmarkedPostId: unbookmarkData ? parseInt(unbookmarkData) : null,
  };

  if (!currentUserId) redirect("/");

  if (Object.values(interactions).filter((v) => v !== null).length > 1) {
    return {
      error: parsePrismaError(
        "Interaction request must contain only one interaction type.",
      ),
    };
  }

  try {
    if (interactions.likedPostId) {
      await prisma.like.create({
        data: {
          likerId: currentUserId,
          likedPostId: interactions.likedPostId,
        },
      });
      return { success: "liked" };
    } else if (interactions.unlikedPostId) {
      await prisma.like.delete({
        where: {
          likerId_likedPostId: {
            likerId: currentUserId,
            likedPostId: interactions.unlikedPostId,
          },
        },
      });
      return { success: "unliked" };
    } else if (interactions.bookmarkedPostId) {
      await prisma.bookmark.create({
        data: {
          bookmarkerId: currentUserId,
          bookmarkedPostId: interactions.bookmarkedPostId,
        },
      });

      return { success: "bookmarked" };
    } else if (interactions.unbookmarkedPostId) {
      await prisma.bookmark.delete({
        where: {
          bookmarkerId_bookmarkedPostId: {
            bookmarkerId: currentUserId,
            bookmarkedPostId: interactions.unbookmarkedPostId,
          },
        },
      });
      return { success: "unbookmarked" };
    }
  } catch (err) {
    console.error(err);
    return { error: parsePrismaError(err) };
  }
};
