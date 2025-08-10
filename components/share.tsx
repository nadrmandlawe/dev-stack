"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

type ShareProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
  label?: string;
  iconOnly?: boolean;
};

export function Share({
  variant = "outline",
  size = "default",
  className,
  label = "Share",
  iconOnly = false,
}: ShareProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [searchParams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    toast.success("Copied to clipboard");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={iconOnly ? "icon" : size}
          className={className}
          aria-label={label}
        >
          <Share2 className="size-4" />
          {!iconOnly && <span className="hidden sm:inline">{label}</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" value={currentUrl} readOnly />
          </div>
          <Button
            variant="outline"
            onClick={handleCopy}
            size="icon"
            className="rounded-full"
          >
            {isCopied ? (
              <Check className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
