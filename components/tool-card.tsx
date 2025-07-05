import { Tool } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";

interface ToolCardProps {
  tool: Tool;
  selected: boolean;
  onToggle: (toolId: string) => void;
}

export function ToolCard({ tool, selected, onToggle }: ToolCardProps) {
  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
        selected && "border-blue-500 bg-blue-50 dark:bg-blue-950"
      }`}
      onClick={() => onToggle(tool.id)}
    >
      <Checkbox checked={selected} onChange={() => onToggle(tool.id)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={tool.icon || ""}
              alt={tool.name}
              className=" dark:bg-white rounded-full size-6 p-0.5"
              width={24}
              height={24}
            />
            <h4 className="font-medium text-sm">{tool.name}</h4>
          </div>
          {tool.website && (
            <Link
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              Website
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{tool.description}</p>
      </div>
    </div>
  );
}
