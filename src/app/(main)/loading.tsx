import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-8xl">
      <Loader2
        className="animate-spin text-9xl text-accent-foreground opacity-40"
        size={48}
      />
    </div>
  );
}
