"use client";
import {
  Terminal,
  Hammer,
  Copy,
  Sparkles,
  Download,
  Check,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ResetButton } from "@/components/reset-button";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
import { ToolCard } from "@/components/tool-card";
import { OperatingSystem, operatingSystemIcons } from "@/lib/data";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import { categories } from "@/lib/data";
import {
  generateScript,
  downloadScript,
  copyToClipboard,
} from "@/lib/script-generator";
import { toast } from "sonner";
import { QuickPresets } from "./quick-presets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectedToolsBar } from "./selected-tools-bar";
import { Input } from "./ui/input";
import { Share } from "./share";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PlaygroundEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedOS, setSelectedOS] = useState<OperatingSystem>("macos");
  const [selectedTools, setSelectedTools] = useState<Set<string>>(new Set());
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [scriptGenerated, setScriptGenerated] = useState(false);
  const [tab, setTab] = useState("builder" as "builder" | "script");
  const [commandCopied, setCommandCopied] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);

  const listVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.04 },
      },
    }),
    []
  );
  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 6 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );

  // Stepper: each step is a category
  const stepCategories = categories.filter((cat) =>
    cat.tools.some((tool) => tool.compatibleOS.includes(selectedOS))
  );
  const maxStep = stepCategories.length;
  const currentCategory = stepCategories[currentStep - 1];
  // const progressPercent = Math.round(
  //   ((currentStep - 1) / Math.max(1, maxStep - 1)) * 100
  // );

  // Selected tools as objects
  const selectedToolObjects = useMemo(
    () =>
      categories
        .flatMap((cat) => cat.tools)
        .filter((tool) => selectedTools.has(tool.id)),
    [selectedTools]
  );

  // Tool selection logic
  const toggleTool = (toolId: string) => {
    setSelectedTools((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) newSet.delete(toolId);
      else newSet.add(toolId);
      return newSet;
    });
  };
  const removeTool = (toolId: string) => {
    setSelectedTools((prev) => {
      const newSet = new Set(prev);
      newSet.delete(toolId);
      return newSet;
    });
  };
  const resetSelection = () => {
    setSelectedTools(new Set());
    setGeneratedScript("");
    setCurrentStep(1);
    setScriptGenerated(false);
    setTab("builder");
  };
  const handlePreset = (toolIds: string[]) => {
    setSelectedTools(new Set(toolIds));
    // Immediately generate the script and show the script card
    const presetTools = categories
      .flatMap((cat) => cat.tools)
      .filter((tool) => toolIds.includes(tool.id));
    if (presetTools.length > 0) {
      const script = generateScript({
        os: selectedOS,
        tools: presetTools,
        includePackageManagers: true,
        includePathSetup: true,
        includeShellConfig: true,
        customName: projectName,
      });
      setGeneratedScript(script);
      setScriptGenerated(true);
      toast.success("Script generated successfully!");
    }
  };

  // Script generation
  const generateScriptHandler = () => {
    if (selectedToolObjects.length === 0) {
      toast.error("Please select at least one tool");

      return;
    }
    const script = generateScript({
      os: selectedOS,
      tools: selectedToolObjects,
      includePackageManagers: true,
      includePathSetup: true,
      includeShellConfig: true,
      customName: projectName,
    });
    setGeneratedScript(script);
    setScriptGenerated(true);
    setTab("script");
    toast.success("Script generated successfully!");
  };
  const downloadScriptHandler = () => {
    if (!generatedScript) {
      toast.error("Please generate a script first");
      return;
    }
    const filename = `${projectName || "dev-setup"}-${selectedOS}.${
      selectedOS === "windows" ? "ps1" : "sh"
    }`;
    downloadScript(generatedScript, filename);
    toast.success("Script downloaded successfully!");
  };
  const copyScriptHandler = async () => {
    if (!generatedScript) {
      toast.error("Please generate a script first");
      return;
    }
    try {
      await copyToClipboard(generatedScript);
      setScriptCopied(true);
      setTimeout(() => {
        setScriptCopied(false);
      }, 2000);
      toast.success("Script copied to clipboard!");
    } catch {
      toast.error("Failed to copy script");
    }
  };

  // Command preview (example)
  const commandPreview = `# Run this to set up your dev environment\nsh ${
    projectName || "dev-setup"
  }-${selectedOS}.${selectedOS === "windows" ? "ps1" : "sh"}`;

  // Restore state from URL on load
  const searchParamsString = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  useEffect(() => {
    const os = searchParams.get("os");
    const tools = searchParams.get("tools");
    const name = searchParams.get("name");
    if (os && ["macos", "windows", "linux"].includes(os))
      setSelectedOS(os as OperatingSystem);
    if (tools) setSelectedTools(new Set(tools.split(",")));
    if (name) setProjectName(name);
  }, [searchParamsString, searchParams]);

  // Update URL when state changes
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    params.set("os", selectedOS);
    if (selectedTools.size > 0)
      params.set("tools", Array.from(selectedTools).join(","));
    if (projectName) params.set("name", projectName);
    const url = `?${params.toString()}`;
    router.replace(url, { scroll: false });
  }, [selectedOS, selectedTools, projectName, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handleCopyCommand = () => {
    copyToClipboard(commandPreview);
    setCommandCopied(true);
    setTimeout(() => {
      setCommandCopied(false);
    }, 2000);
    toast.success("Command copied to clipboard!");
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-background/60 bg-clip-padding backdrop-blur supports-[backdrop-filter]:bg-background/50 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)] w-full h-full flex-1">
      <div className="flex-col flex-1 md:flex w-full h-full">
        <div className="relative flex items-center justify-center border-b border-black/5 dark:border-white/5 bg-background/70 rounded-t-2xl h-14">
          {/* Mac window controls, left */}
          <div className="flex items-center gap-2 px-4 absolute left-0">
            <span className="size-3 rounded-full bg-[#ff5f57] border border-black/10" />
            <span className="size-3 rounded-full bg-[#ffbd2e] border border-black/10" />
            <span className="size-3 rounded-full bg-[#28c840] border border-black/10" />
          </div>
          {/* Centered title */}
          <div className="flex items-center justify-center pointer-events-none select-none">
            <span
              className="text-[15px] font-medium text-foreground/90 tracking-tight leading-none"
              style={{ letterSpacing: "-0.01em" }}
            >
              Dev Environment Builder
            </span>
          </div>
          {/* Progress and Share, right-aligned */}
          <div className="flex items-center gap-2 px-4 absolute right-0">
            {/* <div className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur supports-[backdrop-filter]:bg-background/50">
              <div className="relative h-1.5 w-24 rounded-full bg-muted/60 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-foreground/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.3 }}
                />
              </div>
              <span className="tabular-nums">{progressPercent}%</span>
            </div> */}
            <Share variant="outline" size="sm" label="Share" />
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ResetButton
                onReset={resetSelection}
                generatedScript={generatedScript}
                selectedToolObjects={selectedToolObjects}
              />
            </motion.div>
          </div>
        </div>
        <Separator />
        {/* Removed bottom progress bar for a cleaner mac-like header-driven progress */}

        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "builder" | "script")}
          className="flex flex-1 flex-col px-4 w-full h-full"
        >
          <div className="flex flex-1 flex-col py-6">
            <div className="grid flex-1 items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="flex-col gap-6 sm:flex md:order-2">
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-2">
                    <Label>Mode</Label>
                    <TabsList className="grid w-full grid-cols-2  bg-muted/60 px-1">
                      <TabsTrigger
                        value="builder"
                        className=" data-[state=active]:bg-background"
                      >
                        <Hammer className="size-4" />
                        <span className="">Build</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="script"
                        className=" data-[state=active]:bg-background"
                      >
                        <Terminal className="size-4" />
                        <span className="">Script</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  {tab === "builder" && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium">
                          Project Name
                        </label>
                        <Input
                          type="text"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          placeholder="my-dev-setup"
                          className="w-full"
                          maxLength={25}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium">
                          Operating System
                        </label>
                        <Select
                          value={selectedOS}
                          onValueChange={(v) =>
                            setSelectedOS(v as OperatingSystem)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(operatingSystemIcons).map(
                              ([os, icon]) => (
                                <SelectItem key={os} value={os}>
                                  <Image
                                    src={icon}
                                    alt={os}
                                    className="dark:bg-white rounded-full size-5 p-0.5"
                                    width={24}
                                    height={24}
                                  />
                                  {os}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {selectedToolObjects.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <label className="block text-sm font-medium">
                            Selected Tools
                          </label>
                          <div>
                            <SelectedToolsBar
                              selectedTools={selectedToolObjects}
                              onRemove={removeTool}
                            />
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={generateScriptHandler}
                        disabled={selectedToolObjects.length === 0}
                        className="rounded-full"
                      >
                        <Sparkles className="size-4" /> Generate Script
                      </Button>
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium">
                          Quick Presets
                        </label>
                        <QuickPresets onPresetSelect={handlePreset} />
                      </div>
                    </>
                  )}
                  {tab === "script" && scriptGenerated && (
                    <>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={downloadScriptHandler}
                          disabled={!generatedScript}
                        >
                          <Download className="size-4" /> Download Script
                        </Button>
                        <Button
                          onClick={copyScriptHandler}
                          disabled={!generatedScript}
                        >
                          {scriptCopied ? (
                            <>
                              <Check className="size-4 text-green-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="size-4" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium">
                            Command Preview
                          </label>
                          <Button
                            onClick={handleCopyCommand}
                            size="sm"
                            variant="outline"
                            className="size-7 p-0 rounded-full"
                          >
                            {commandCopied ? (
                              <Check className="size-3.5" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </Button>
                        </div>
                        <div className="relative">
                          <pre className="text-xs bg-muted/60 p-2 rounded-md border flex items-center overflow-x-auto whitespace-nowrap max-w-full">
                            <span className="truncate block max-w-full">
                              {`$ sh ${projectName || "setup"}-${selectedOS}.${
                                selectedOS === "windows" ? "ps1" : "sh"
                              }`}
                            </span>
                          </pre>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col *:data-[slot=tab-content]:flex-1 md:order-1 w-full">
                <TabsContent
                  value="builder"
                  className="mt-0 border-0 p-0 h-full"
                >
                  <div className="grid gap-4 md:grid-cols-[260px_1fr]">
                    {/* Sidebar */}
                    <aside className="rounded-2xl border bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                      <ul className="p-2">
                        {stepCategories.map((cat, idx) => {
                          const isActive = idx + 1 === currentStep;
                          return (
                            <li key={cat.id} className="p-1">
                              <button
                                className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors border ${
                                  isActive
                                    ? "bg-background border-foreground/10"
                                    : "hover:bg-muted/60 border-transparent"
                                }`}
                                onClick={() => setCurrentStep(idx + 1)}
                              >
                                <span className="text-base" aria-hidden>
                                  <cat.icon className="size-4" />
                                </span>
                                <span className="truncate text-left">
                                  {cat.name}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </aside>

                    {/* Main pane */}
                    <motion.section
                      key={currentCategory?.id}
                      className="flex flex-col h-full gap-3 rounded-2xl border bg-background/50 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/40"
                    >
                      {/* Tool selection list */}
                      <motion.div
                        key={`${currentCategory?.id}-${selectedOS}`}
                        variants={listVariants}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-3"
                      >
                        {currentCategory.tools
                          .filter((tool) =>
                            tool.compatibleOS.includes(selectedOS)
                          )
                          .map((tool) => (
                            <motion.div
                              key={tool.id}
                              variants={itemVariants}
                              layout
                            >
                              <ToolCard
                                tool={tool}
                                selected={selectedTools.has(tool.id)}
                                onToggle={toggleTool}
                              />
                            </motion.div>
                          ))}
                      </motion.div>

                      {/* Navigation */}
                      <div className="mt-auto flex justify-between pt-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentStep((s) => Math.max(1, s - 1))
                          }
                          disabled={currentStep === 1}
                          className="rounded-full"
                        >
                          Previous
                        </Button>
                        {currentStep === maxStep ? (
                          <Button
                            onClick={generateScriptHandler}
                            disabled={selectedToolObjects.length === 0}
                            className="rounded-full"
                          >
                            <Sparkles className="size-4" /> Generate Script
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() =>
                              setCurrentStep((s) => Math.min(maxStep, s + 1))
                            }
                            className="rounded-full"
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </motion.section>
                  </div>
                </TabsContent>

                <TabsContent value="script" className="mt-0 border-0 p-0 ">
                  <div className="flex h-full flex-col gap-4  rounded-2xl p-4 bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                    <AnimatePresence mode="wait">
                      {scriptGenerated ? (
                        <motion.div
                          key="script"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col overflow-hidden rounded-2xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50"
                        >
                          {/* Terminal chrome header */}
                          <div className="relative flex items-center h-10 border-b border-black/5 dark:border-white/5 px-3 bg-background/70">
                            <div className="flex items-center gap-1.5">
                              <span className="size-2.5 rounded-full bg-[#ff5f57] border border-black/10" />
                              <span className="size-2.5 rounded-full bg-[#ffbd2e] border border-black/10" />
                              <span className="size-2.5 rounded-full bg-[#28c840] border border-black/10" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                              <span className="text-xs font-medium text-foreground/80 tracking-tight">
                                {(projectName || "dev-setup") +
                                  `-${selectedOS}.${
                                    selectedOS === "windows" ? "ps1" : "sh"
                                  }`}{" "}
                                — Script Preview
                              </span>
                            </div>
                          </div>
                          {/* Code body */}
                          <div className="relative">
                            <pre className="text-xs lg:text-sm font-mono text-foreground bg-muted/50 p-4 whitespace-pre-wrap leading-relaxed max-h-[560px] min-h-[460px] overflow-y-auto">
                              {generatedScript}
                            </pre>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col items-center justify-center border rounded-2xl  bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 min-h-[460px] text-center p-8"
                        >
                          <div className="rounded-xl border bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground">
                            $ Select tools and generate a script to preview it
                            here
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground">
                            You can also try a quick presets from the sidebar.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
