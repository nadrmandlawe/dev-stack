import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void;
}

export function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onReset}
      className="flex items-center gap-1"
    >
      <RotateCcw className="size-4" />
      Reset Selection
    </Button>
  );
}
