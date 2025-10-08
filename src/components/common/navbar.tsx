"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-accent border-b-2 bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <Link className="flex items-center gap-4" href="/">
          <Image
            alt="Logo"
            height={40}
            src={`/${mounted && theme === "light" ? "logo" : "logo_mono"}.png`}
            width={40}
          />
          <h1 className="font-bold text-xl">Cocktails</h1>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/favorites">
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
