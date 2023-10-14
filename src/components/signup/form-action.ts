"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { parsePrismaError } from "@/lib/utils";

export const handleSubmit = async (formData: FormData) => {
  const id = formData.get("id")!.toString();
  const name = formData.get("name")?.toString();
  const handle = formData.get("handle")!.toString();

  try {
    await prisma.user.update({
      where: { id: id },
      data: name ? { name: name, handle: handle } : { handle: handle },
    });
  } catch (err) {
    console.error(err);
    return parsePrismaError(err);
  }

  redirect("/home");
};
