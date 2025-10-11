"use client";

import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ThemeToggle } from "./theme-toggle";

const SEARCH_DEBOUNCE_MS = 300;

export function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("name") || ""
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pathname !== "/") {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (searchValue) {
        params.set("name", searchValue);
      } else {
        params.delete("name");
      }

      // Reset to page 1 when search changes
      params.set("page", "1");

      router.push(`?${params.toString()}`);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [searchValue, router, searchParams, pathname]);

  return (
    <nav className="sticky top-0 z-50 border-accent border-b-2 bg-background/95">
      <div className="container relative mx-auto flex h-16 items-center justify-between p-4">
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
          {/* Mobile: Icon button that toggles search bar */}
          <Button
            className="sm:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            size="icon"
            variant="outline"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Desktop: Always visible search */}
          <div className="relative max-sm:hidden">
            <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-48 pl-9 text-sm"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search cocktails..."
              type="search"
              value={searchValue}
            />
          </div>

          <Button asChild variant="outline">
            <Link className="flex items-center" href="/favorites">
              <Heart className="h-4 w-4" />
              <span className="ml-2 max-sm:hidden">Favorites</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile: Full-width search bar "second floor" */}
      {isSearchExpanded && (
        <div className="border-accent border-t bg-background/95 p-4 sm:hidden">
          <div className="container relative mx-auto">
            <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full pl-9"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search cocktails..."
              type="search"
              value={searchValue}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
