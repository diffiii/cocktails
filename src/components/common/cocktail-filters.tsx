"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getCocktailCategories,
  getCocktailGlasses,
} from "@/api/queries/cocktails";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CocktailFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categoriesData } = useQuery({
    queryKey: ["cocktail-categories"],
    queryFn: getCocktailCategories,
  });

  const { data: glassesData } = useQuery({
    queryKey: ["cocktail-glasses"],
    queryFn: getCocktailGlasses,
  });

  const currentCategory = searchParams.get("category") || "";
  const currentGlass = searchParams.get("glass") || "";
  const currentAlcoholic = searchParams.get("alcoholic") || "";
  const currentSort = searchParams.get("sort") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const hasActiveFilters =
    currentCategory !== "" ||
    currentGlass !== "" ||
    currentAlcoholic !== "" ||
    currentSort !== "";

  return (
    <div className="mb-8 flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="category-filter"
          >
            Category
          </label>
          <Select
            onValueChange={(value) =>
              updateFilter("category", value === "all" ? "" : value)
            }
            value={currentCategory}
          >
            <SelectTrigger className="w-40" id="category-filter">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categoriesData?.data
                .filter((category): category is string => category !== null)
                .map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Glass Filter */}
        <div className="space-y-2">
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="glass-filter"
          >
            Glass Type
          </label>
          <Select
            onValueChange={(value) =>
              updateFilter("glass", value === "all" ? "" : value)
            }
            value={currentGlass}
          >
            <SelectTrigger className="w-40" id="glass-filter">
              <SelectValue placeholder="All glasses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All glasses</SelectItem>
              {glassesData?.data
                .filter((glass): glass is string => glass !== null)
                .map((glass) => (
                  <SelectItem key={glass} value={glass}>
                    {glass}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alcoholic Filter */}
        <div className="space-y-2">
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="alcoholic-filter"
          >
            Type
          </label>
          <Select
            onValueChange={(value) =>
              updateFilter("alcoholic", value === "all" ? "" : value)
            }
            value={currentAlcoholic}
          >
            <SelectTrigger className="w-40" id="alcoholic-filter">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="true">Alcoholic</SelectItem>
              <SelectItem value="false">Non-alcoholic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label
            className="font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="sort-filter"
          >
            Sort By
          </label>
          <Select
            onValueChange={(value) =>
              updateFilter("sort", value === "all" ? "" : value)
            }
            value={currentSort}
          >
            <SelectTrigger className="w-40" id="sort-filter">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Default</SelectItem>
              <SelectItem value="+name">Name</SelectItem>
              <SelectItem value="+updatedAt">Recently Updated</SelectItem>
              <SelectItem value="+glass">Glass</SelectItem>
              <SelectItem value="+category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            className="w-40"
            disabled={!hasActiveFilters}
            onClick={clearFilters}
            variant="secondary"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
