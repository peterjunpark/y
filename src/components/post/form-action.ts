"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

export const handleSubmit = async (formData: FormData) => {
  const content = formData.get("content") as string;

  try {
    await prisma.post.create({
      data: { body: content },
    });
  } catch (err) {
    console.error(err);
  }

  // try {
  //   await prisma.user.update({
  //     where: { id: id },
  //     data: { name: name, handle: handle },
  //   });
  // } catch (err) {
  //   return parsePrismaError(err);
  // }

  redirect("/home");
};
