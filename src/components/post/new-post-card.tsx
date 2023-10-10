import { getCurrentUser } from "@/lib/utils";
import { Card } from "../ui/card";
import { UserAvatar } from "../user/avatar";
import { NewPostForm } from "./form";

export async function NewPostCard() {
  const { image } = await getCurrentUser();

  return (
    <Card className={"flex items-start gap-3 rounded-none p-2"}>
      <span className="hidden pt-2 sm:block">
        <UserAvatar image={image} />
      </span>
      <NewPostForm />
    </Card>
  );
}
