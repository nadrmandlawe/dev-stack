import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { Tool } from "@/lib/data";

interface ResetButtonProps {
  onReset: () => void;
  generatedScript: string;
  selectedToolObjects: Tool[];
}

export function ResetButton({ onReset, generatedScript, selectedToolObjects }: ResetButtonProps) {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onReset}
      className="flex items-center gap-1 w-full md:w-auto"
      disabled={!generatedScript && selectedToolObjects.length === 0}
    >
      <RotateCcw className="size-4" />
      <span className="hidden sm:inline">Reset</span>
    </Button>
  );
}
