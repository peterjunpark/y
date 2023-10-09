"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

export const handleSubmit = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const handle = formData.get("handle") as string;

  try {
    await prisma.user.update({
      where: { id: id },
      data: { name: name, handle: handle },
    });
  } catch (err) {
    return parsePrismaError(err);
  }

  redirect("/home");
};
