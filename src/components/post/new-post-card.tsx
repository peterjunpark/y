import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Card } from "../ui/card";
import { UserAvatar } from "../layout/atoms/user-avatar";
import { NewPostForm } from "./form";

export async function NewPostCard() {
  const session = await getServerSession(authOptions);
  const authorId = session?.user.id!;

  return (
    <Card className="flex items-start gap-3 rounded-none p-2">
      <span className="hidden pt-2 sm:block">
        <UserAvatar hideHandle />
      </span>
      <NewPostForm authorId={authorId} />
    </Card>
  );
}
