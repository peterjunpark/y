"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

export const handleSubmit = async (formData: FormData) => {
  const authorId = formData.get("authorId") as string;
  const content = formData.get("content") as string;

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
