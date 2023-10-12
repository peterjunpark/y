import { getCurrentUser } from "@/lib/utils";
import { Card } from "../ui/card";
import { UserAvatar } from "../user/avatar";
import { NewPostForm } from "./form";

type NewPostCardProps = {
  replyTo?: number;
  thread?: number;
};

export async function NewPostCard({ replyTo, thread }: NewPostCardProps) {
  const { image } = await getCurrentUser();

  return (
    <Card className={"flex items-start gap-3 rounded-none p-2"}>
      <span className="hidden pl-2 pt-2 sm:block">
        <UserAvatar image={image} />
      </span>
      <NewPostForm variant="compact" replyTo={replyTo} thread={thread} />
    </Card>
  );
}
