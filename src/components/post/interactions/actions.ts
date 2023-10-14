"use server";

import { revalidatePath } from "next/cache";
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
      const liker = await prisma.like.create({
        data: {
          likerId: currentUserId,
          likedPostId: interactions.likedPostId,
        },
        select: { liker: { select: { handle: true } } },
      });

      revalidatePath(`/${liker.liker.handle}/likes`);
      return { success: "liked" };
    } else if (interactions.unlikedPostId) {
      const liker = await prisma.like.delete({
        where: {
          likerId_likedPostId: {
            likerId: currentUserId,
            likedPostId: interactions.unlikedPostId,
          },
        },
        select: { liker: { select: { handle: true } } },
      });

      revalidatePath(`/${liker.liker.handle}/likes`);
      return { success: "unliked" };
    } else if (interactions.bookmarkedPostId) {
      await prisma.bookmark.create({
        data: {
          bookmarkerId: currentUserId,
          bookmarkedPostId: interactions.bookmarkedPostId,
        },
      });

      revalidatePath("/bookmarks");
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

      revalidatePath("/bookmarks");
      return { success: "unbookmarked" };
    }
  } catch (err) {
    console.error(err);
    return { error: parsePrismaError(err) };
  }
};

type FollowReturnType = {
  success?: "followed" | "unfollowed";
  error?: { message: string; code: string; target: unknown };
};

export const handleFollow = async (
  formData: FormData,
): Promise<FollowReturnType | void> => {
  const currentUserId = formData.get("currentUserId")?.toString();
  const followedUserId = formData.get("followedUserId")?.toString();
  const unfollowedUserId = formData.get("unfollowedUserId")?.toString();

  if (followedUserId && unfollowedUserId) {
    return {
      error: parsePrismaError("Cannot follow and unfollow at the same time."),
    };
  }

  try {
    if (followedUserId) {
      const user = await prisma.user.update({
        where: { id: followedUserId },
        data: {
          followers: {
            connect: { id: currentUserId },
          },
        },
        select: { handle: true },
      });

      revalidatePath(`/${user.handle}`);
      return { success: "followed" };
    } else if (unfollowedUserId) {
      const user = await prisma.user.update({
        where: { id: unfollowedUserId },
        data: {
          followers: {
            disconnect: { id: currentUserId },
          },
        },
        select: { handle: true },
      });

      revalidatePath(`/${user.handle}`);
      return { success: "unfollowed" };
    }
  } catch (err) {
    console.error(err);
    return { error: parsePrismaError(err) };
  }
};
