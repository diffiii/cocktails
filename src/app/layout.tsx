import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { JotaiProvider } from "@/components/providers/jotai-provider";
import { TanstackQueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cocktails",
  description: "Cocktails browsing app - recruitment task for KN Solvro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <JotaiProvider>
          <TanstackQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              <div className="flex min-h-screen flex-col">
                <Suspense fallback={<div className="h-16" />}>
                  <Navbar />
                </Suspense>
                <main className="container mx-auto flex-grow px-4 py-8">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </TanstackQueryProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
