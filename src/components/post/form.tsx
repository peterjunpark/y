import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAvatar } from "@/components/layout/atoms/user-avatar";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function PostForm() {
  return (
    <Card className="rounded-none">
      <CardContent>
        <UserAvatar hideHandle />
      </CardContent>
    </Card>
  );
}
