import { Tool } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
  selected: boolean;
  onToggle: (toolId: string) => void;
}

export function ToolCard({ tool, selected, onToggle }: ToolCardProps) {
  return (
    <div
      role="button"
      aria-pressed={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(tool.id);
        }
      }}
      onClick={() => onToggle(tool.id)}
      className={`group relative flex items-start gap-3 p-3 rounded-2xl border bg-background/60 bg-clip-padding backdrop-blur supports-[backdrop-filter]:bg-background/50 cursor-pointer transition-all duration-200 hover:border-foreground/10 active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
        selected
          ? "border-blue-500/30 ring-2 ring-blue-500/20 shadow-[0_0_0_1px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.06)] bg-gradient-to-br from-blue-500/5 to-transparent"
          : "shadow-[0_1px_0_0_rgba(0,0,0,0.03)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
      }`}
    >
      {/* Selection indicator */}
      <div className="absolute right-3 top-3">
        <span
          className={`inline-flex items-center justify-center size-5 rounded-full border transition-colors ${
            selected
              ? "bg-foreground text-background border-foreground/80"
              : "border-foreground/20 bg-background/70"
          }`}
        >
          {selected && <Check className="size-3.5" />}
        </span>
      </div>

      {/* Hidden checkbox for accessibility state sync */}
      <span className="sr-only">
        <Checkbox checked={selected} onChange={() => onToggle(tool.id)} />
      </span>

      {/* Icon */}
      <div className="shrink-0">
        <div
          className={`size-9 rounded-xl border bg-background/70 dark:bg-white/90 p-1.5 flex items-center justify-center overflow-hidden transition-colors ${
            selected ? "border-blue-500/40 ring-1 ring-blue-500/20" : ""
          }`}
        >
          <Image
            src={tool.icon || ""}
            alt={tool.name}
            className="rounded-md object-contain"
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm tracking-tight truncate">
            {tool.name}
          </h4>
          {tool.website && (
            <Link
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Website
            </Link>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {tool.description}
        </p>
      </div>
    </div>
  );
}
