import "./globals.css";

import type { Metadata } from "next";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Scylla Dashboard",
  description: "Account Management for Scylla",
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn(
          "select-text overscroll-none scroll-smooth font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
          enableSystem
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
