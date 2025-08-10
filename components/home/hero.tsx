"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { operatingSystemIcons, type OperatingSystem } from "@/lib/data";

type Props = {
  selectedOS: OperatingSystem;
  onChangeOS: (os: OperatingSystem) => void;
};

export function Hero({ selectedOS, onChangeOS }: Props) {
  return (
    <div className="pt-8 pb-8">
        
      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 animate-fade-up"
          style={{ animationDelay: "40ms" }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex items-center justify-center h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Now available for
          </span>
          <span className="inline-flex items-center gap-1">
            <Image
              src={operatingSystemIcons.macos}
              alt="macOS"
              width={14}
              height={14}
              className="dark:bg-white rounded-full p-0.5"
            />
            macOS
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Image
              src={operatingSystemIcons.windows}
              alt="Windows"
              width={14}
              height={14}
              className="dark:bg-white rounded-full p-0.5"
            />
            Windows
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Image
              src={operatingSystemIcons.linux}
              alt="Linux"
              width={14}
              height={14}
              className="dark:bg-white rounded-full p-0.5"
            />
            Linux
          </span>
        </div>
        <h1
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.07] animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Craft your perfect dev setup.
          <br className="hidden md:block" />
          Ready in minutes.
        </h1>
        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Choose a preset or build your own. We generate a single, ready-to‑run
          script for macOS, Windows, and Linux.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center gap-3 animate-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          <Link href={`/builder?os=${selectedOS}`} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="rounded-full px-6 py-5 w-full sm:w-auto"
            >
              Get started
            </Button>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border px-2 py-1 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <span className="text-xs text-muted-foreground px-2">
              Target OS
            </span>
            <Select
              value={selectedOS}
              onValueChange={(v) => onChangeOS(v as OperatingSystem)}
            >
              <SelectTrigger className="h-9 w-[160px] rounded-full border-0 shadow-lg border-primary/20 dark:border-primary/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                {Object.entries(operatingSystemIcons).map(([os, icon]) => (
                  <SelectItem key={os} value={os}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={icon}
                        alt={os}
                        className="dark:bg-white rounded-full size-5 p-0.5"
                        width={20}
                        height={20}
                      />
                      <span className="capitalize">{os}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Decorative line */}
      <div
        aria-hidden
        className="relative w-full mt-10 animate-fade-up"
        style={{ animationDelay: "360ms" }}
      >
        <svg
          viewBox="0 0 1000 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-16 w-full max-w-4xl select-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Light mode gradient */}
            <linearGradient
              id="hero-line-gradient-light"
              x1="0"
              y1="0"
              x2="1000"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.55"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--muted-foreground))"
                stopOpacity="0.45"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.55"
              />
            </linearGradient>
            {/* Dark mode gradient */}
            <linearGradient
              id="hero-line-gradient-dark"
              x1="0"
              y1="0"
              x2="1000"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.75"
              />
              <stop
                offset="50%"
                stopColor="hsl(var(--muted-foreground))"
                stopOpacity="0.35"
              />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.75"
              />
            </linearGradient>
            <filter
              id="hero-line-glow"
              x="-20%"
              y="-200%"
              width="140%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Light mode */}
          <g className="dark:hidden">
            <path
              d="M 0 70 C 200 20, 380 115, 560 45 C 720 -5, 850 85, 1000 55"
              stroke="url(#hero-line-gradient-light)"
              strokeOpacity="0.25"
              strokeWidth="8"
              filter="url(#hero-line-glow)"
            />
            <path
              d="M 0 70 C 200 20, 380 115, 560 45 C 720 -5, 850 85, 1000 55"
              stroke="url(#hero-line-gradient-light)"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              className="animate-stroke-draw"
            />
            <path
              d="M 0 70 C 200 20, 380 115, 560 45 C 720 -5, 850 85, 1000 55"
              stroke="hsl(var(--foreground)/0.25)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          </g>
          {/* Dark mode - white stroke */}
          <g className="hidden dark:block">
            <path
              d="M 0 70 C 200 20, 380 115, 560 45 C 720 -5, 850 85, 1000 55"
              stroke="#ffffff"
              strokeOpacity="0.28"
              strokeWidth="8"
              filter="url(#hero-line-glow)"
            />
            <path
              d="M 0 70 C 200 20, 380 115, 560 45 C 720 -5, 850 85, 1000 55"
              stroke="#ffffff"
              strokeWidth="2"
              shapeRendering="geometricPrecision"
              className="animate-stroke-draw"
            />
            <path
              d="M 0 70 C 200 20, 380 115, 560 45 C 720 -5, 850 85, 1000 55"
              stroke="#ffffff"
              strokeOpacity="0.4"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
