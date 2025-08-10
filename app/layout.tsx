import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevSetup Generator - Custom Development Environment Scripts",
  description: "Create custom installation scripts for your development environment. Choose from 400+ tools across 13 categories for macOS, Windows, and Linux.",
  keywords: "development setup, installation scripts, dev tools, automation, macOS, Windows, Linux",
  icons: {
    icon: "/dev-logo.png",
    apple: "/dev-logo.png",
    shortcut: "/dev-logo.png",
    
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Subtle global background to evoke macOS depth */}
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 0%, hsl(var(--primary)/0.06) 0%, transparent 60%), radial-gradient(35% 35% at 90% 10%, hsl(var(--muted-foreground)/0.06) 0%, transparent 60%)",
            }}
          />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
