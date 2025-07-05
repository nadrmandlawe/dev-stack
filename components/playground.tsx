"use client";
import {
  Clock,
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
import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
} from "@/components/ui/stepper";
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

  // Stepper: each step is a category
  const stepCategories = categories.filter((cat) =>
    cat.tools.some((tool) => tool.compatibleOS.includes(selectedOS))
  );
  const maxStep = stepCategories.length;
  const currentCategory = stepCategories[currentStep - 1];

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
    <div className="bg-background overflow-hidden rounded-lg border bg-clip-padding xl:rounded-xl w-full h-full flex-1">
      <div className="flex-col flex-1 md:flex w-full h-full">
        <div className=" flex flex-col items-start justify-between gap-2 p-4 sm:flex-row sm:items-center sm:gap-0 md:h-16">
          {!generatedScript ? (
            <div className="flex items-center gap-2 w-full">
              {currentCategory.icon}
              <div className="flex flex-col">
                <span className="text-lg font-semibold">
                  {currentCategory.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {currentCategory.description}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-green-500" />
                <span className="text-lg font-semibold">Generated Script</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Your custom setup script is ready!
              </p>
            </div>
          )}
          <Share />
        </div>
        <Separator />

        <Tabs
          value={tab}
          onValueChange={(value) => setTab(value as "builder" | "script")}
          className="flex flex-1 flex-col px-4 w-full h-full"
        >
          <div className="flex flex-1 flex-col py-6">
            <div className="grid flex-1 items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="flex-col gap-6 sm:flex md:order-2">
                <div className="flex flex-col gap-4 mt-4">
                  {(generatedScript || selectedToolObjects.length > 0) && (
                    <ResetButton onReset={resetSelection} />
                  )}
                  <div className="flex flex-col gap-2">
                    <Label>Mode</Label>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="builder">
                        <Hammer className="size-4" />
                        <span className="">Build</span>
                      </TabsTrigger>
                      <TabsTrigger value="script">
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
                          <SelectedToolsBar
                            selectedTools={selectedToolObjects}
                            onRemove={removeTool}
                          />
                        </div>
                      )}

                      <Button
                        onClick={generateScriptHandler}
                        disabled={selectedToolObjects.length === 0}
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
                            className="size-7 p-0"
                          >
                            {commandCopied ? (
                              <Check className="size-3.5" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </Button>
                        </div>

                        {/* <Input
                          className="text-xs break-all text-green-500 bg-black"
                          readOnly
                          value={`$ sh ${
                            projectName || "setup"
                          }-${selectedOS}.${
                            selectedOS === "windows" ? "ps1" : "sh"
                          }`}
                        /> */}
                        <pre className="text-xs break-all text-green-500 bg-muted/50 p-2 rounded-lg border flex items-center">
                          {`$ sh ${projectName || "setup"}-${selectedOS}.${
                            selectedOS === "windows" ? "ps1" : "sh"
                          }`}
                        </pre>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col *:data-[slot=tab-content]:flex-1 md:order-1 w-full">
                <TabsContent value="builder" className="mt-0 border-0 p-0">
                  {/* Stepper */}

                  <div className="flex h-full flex-col gap-4 border rounded-2xl p-4">
                    <Stepper value={currentStep} onValueChange={setCurrentStep}>
                      {stepCategories.map((cat, idx) => (
                        <StepperItem
                          key={cat.id}
                          step={idx + 1}
                          className="not-last:flex-1"
                        >
                          <StepperTrigger>
                            <StepperIndicator />
                          </StepperTrigger>
                          {idx < stepCategories.length && <StepperSeparator />}
                        </StepperItem>
                      ))}
                    </Stepper>
                    {/* Tool selection grid */}
                    <div className="flex flex-col gap-4 mt-6 h-full">
                      {currentCategory.tools
                        .filter((tool) =>
                          tool.compatibleOS.includes(selectedOS)
                        )
                        .map((tool) => (
                          <ToolCard
                            key={tool.id}
                            tool={tool}
                            selected={selectedTools.has(tool.id)}
                            onToggle={toggleTool}
                          />
                        ))}
                    </div>
                    {/* Stepper navigation buttons beneath the tools */}
                    <div className="flex justify-between mt-6">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentStep((s) => Math.max(1, s - 1))
                        }
                        disabled={currentStep === 1}
                      >
                        Previous
                      </Button>
                      {currentStep === maxStep ? (
                        <Button
                          onClick={generateScriptHandler}
                          disabled={selectedToolObjects.length === 0}
                        >
                          <Sparkles className="size-4" /> Generate Script
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() =>
                            setCurrentStep((s) => Math.min(maxStep, s + 1))
                          }
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="script" className="mt-0 border-0 p-0 ">
                  <div className="flex h-full flex-col gap-4 border rounded-2xl p-4">
                    {scriptGenerated ? (
                      <div className="flex flex-col gap-2 break-all">
                        <pre className="text-xs lg:text-sm text-green-500 bg-black p-4 rounded-lg whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                          {generatedScript}
                        </pre>
                      </div>
                    ) : (
                      <div className="h-full min-h-[460px] w-full flex flex-col items-center justify-center bg-muted rounded-2xl">
                        <div className="outline rounded-lg my-4">
                          <Clock className="size-6" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Select tools and generate a script to get started.
                        </p>
                      </div>
                    )}
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
