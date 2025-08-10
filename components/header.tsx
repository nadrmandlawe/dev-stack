import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [{ href: "/builder", label: "Builder" }];

export default function Component() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="w-full bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b">
        <div className="container mx-auto">
          <div className="flex h-14 items-center justify-between gap-4 bg-transparent px-4">
            {/* Left side */}
            <div className="flex items-center">
              {/* Main nav */}
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-1"
                >
                  <Image
                    src="/dev-logo.png"
                    alt="DevStack"
                    width={72}
                    height={72}
                    className="size-8 md:size-10 rounded-md"
                  />
                  <h1 className="text-base md:text-lg font-semibold tracking-tight">
                    DevStack
                  </h1>
                </Link>
                {/* Navigation menu */}
                <NavigationMenu>
                  <NavigationMenuList className="gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          // active={link.active}
                          href={link.href}
                          className="text-muted-foreground font-medium"
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
            {/* Right side */}
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Link href="https://github.com/nadrmandlawe/dev-stack">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Github className="size-4" />
                </Button>
              </Link>
              {/* Mobile menu trigger */}
              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group size-8 md:hidden"
                    variant="ghost"
                    size="icon"
                  >
                    <svg
                      className="pointer-events-none"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12L20 12"
                        className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                      />
                      <path
                        d="M4 12H20"
                        className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                      />
                    </svg>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-36 p-1 md:hidden">
                  <NavigationMenu className="max-w-none *:w-full">
                    <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink
                            href={link.href}
                            className="py-1.5"
                            // active={link.active}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
