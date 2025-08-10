"use client";

import { useState } from "react";
import type { OperatingSystem } from "@/lib/data";
import { Hero } from "@/components/home/hero";
import { PresetsGrid } from "@/components/home/presets-grid";

export default function HomeClient() {
  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("macos");

  return (
    <div className="container mx-auto px-4 flex-1">
      <Hero selectedOS={selectedOS} onChangeOS={setSelectedOS} />
      <PresetsGrid selectedOS={selectedOS} />
    </div>
  );
}
