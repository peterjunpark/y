import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { UserAvatar } from "../layout/atoms/user-avatar";
import { NewPostForm } from "./form";

export function NewPostCard() {
  return (
    <Card className="flex items-start gap-3 rounded-none p-2">
      <span className="hidden pt-2 sm:block">
        <UserAvatar hideHandle />
      </span>
      <NewPostForm />
    </Card>
  );
}
