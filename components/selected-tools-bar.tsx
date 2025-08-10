import { Tool } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface SelectedToolsBarProps {
  selectedTools: Tool[];
  onRemove: (toolId: string) => void;
}

export function SelectedToolsBar({
  selectedTools,
  onRemove,
}: SelectedToolsBarProps) {
  if (selectedTools.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 my-2">
      {selectedTools.map((tool) => (
        <Badge
          key={tool.id}
          variant="secondary"
          className="flex items-center text-xs rounded-full px-2.5 py-1 bg-muted/60"
        >
          <span className="truncate">{tool.name}</span>
          <Button
            type="button"
            variant="ghost"
            className="  p-0 size-3 rounded-full"
            onClick={() => onRemove(tool.id)}
            aria-label={`Remove ${tool.name}`}
            size="icon"
          >
            <X className="size-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}
