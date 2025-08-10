"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { OperatingSystem } from "@/lib/data";
import { categories } from "@/lib/data";
import { PRESETS } from "@/lib/presets";

function getToolById(id: string) {
  return categories.flatMap((c) => c.tools).find((t) => t.id === id);
}

type Props = {
  selectedOS: OperatingSystem;
};

export function PresetsGrid({ selectedOS }: Props) {
  const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  const visiblePresets = PRESETS.map((preset) => {
    const validToolIds = preset.toolIds.filter((id) => {
      const tool = getToolById(id);
      return tool ? tool.compatibleOS.includes(selectedOS) : true;
    });
    return { ...preset, toolIds: validToolIds };
  });

  return (
    <div className="pb-14">
      <div
        className="text-center mb-8 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          Start with a preset
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">
          Curated developer stacks you can customize
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visiblePresets.map((preset, idx) => {
          const href = `/builder?os=${selectedOS}&tools=${encodeURIComponent(
            preset.toolIds.join(",")
          )}&name=${encodeURIComponent(
            preset.name.toLowerCase().replace(/\s+/g, "-")
          )}`;
          const icons = preset.toolIds
            .map((id) => getToolById(id))
            .filter(Boolean)
            .slice(0, 6);
          return (
            <Link key={preset.name} href={href} className="group ">
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.2,
                  margin: "0px 0px -10% 0px",
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (idx % 3) * 0.06,
                }}
                whileHover="hover"
                animate="rest"
                className="h-full"
              >
                <Card className="h-full rounded-2xl border bg-background transition-all duration-200 hover:shadow-sm ">
                  <CardHeader className="space-y-1 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base md:text-lg font-medium tracking-tight">
                        {preset.name}
                      </CardTitle>
                      <motion.span
                        variants={{
                          rest: { x: 0, opacity: 0.75 },
                          hover: { x: 3, opacity: 1 },
                        }}
                        className="inline-flex items-center justify-center rounded-full border text-muted-foreground bg-background size-7"
                      >
                        <ChevronRight className="size-4" />
                      </motion.span>
                    </div>
                    <CardDescription className="text-xs md:text-sm leading-relaxed">
                      {preset.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex -space-x-2 overflow-hidden">
                      {icons.map((tool, i) => (
                        <motion.div
                          key={tool!.id}
                          initial={{ scale: 0.95, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                          viewport={{ once: true }}
                        >
                          <Image
                            src={tool!.icon || ""}
                            alt={tool!.name}
                            className="dark:bg-white rounded-full size-8 p-1 border bg-background"
                            width={32}
                            height={32}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground tabular-nums">
                      {preset.toolIds.length} tools
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-3 mt-12">
        <span className="text-sm text-muted-foreground">
          Prefer starting clean?
        </span>
        <Link href="/builder">
          <Button variant="ghost" className="rounded-full">
            Open the builder
          </Button>
        </Link>
      </div>
    </div>
  );
}
