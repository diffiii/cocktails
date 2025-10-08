import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
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
        <TanstackQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="container mx-auto flex-grow px-4">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
