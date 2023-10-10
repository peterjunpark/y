"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

export const handleSubmit = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const session = await getServerSession(authOptions);
  const authorId = session?.user.id!;

  try {
    await prisma.post.create({
      data: { content: content, author: { connect: { id: authorId } } },
    });
  } catch (err) {
    console.error(err);
    return parsePrismaError(err);
  }
  revalidatePath("/home");
};
