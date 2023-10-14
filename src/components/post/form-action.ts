"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

export const handleSubmit = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  const authorId = session?.user.id!;

  const replyToId = formData.get("replyTo")
    ? parseInt(formData.get("replyTo")!.toString())
    : null;
  const threadId = formData.get("thread")
    ? parseInt(formData.get("thread")!.toString())
    : null;
  const content = formData.get("content")!.toString();

  try {
    // Case: REPLY
    // For a post to be a reply, it must have a replyToId (parentId) and be in an existing thread.
    if (replyToId && threadId) {
      await prisma.post.create({
        data: {
          content: content,
          // The post is connected to the author, the parent post, and the thread.
          author: { connect: { id: authorId } },
          parent: { connect: { id: replyToId } },
          thread: { connect: { id: threadId } },
        },
        select: {
          id: true,
          parent: { select: { threadId: true } },
        },
      });
      // }
    } else {
      // CASE: NOT REPLY
      // If the post is not a reply, we must create a new thread.
      await prisma.thread.create({
        data: {
          posts: {
            // Nested create for the new post.
            create: {
              content: content,
              author: { connect: { id: authorId } },
            },
          },
        },
      });
    }
  } catch (err) {
    console.error(err);
    return parsePrismaError(err);
  }
  revalidatePath(`/${authorId}`);
  revalidatePath("/home");
};
