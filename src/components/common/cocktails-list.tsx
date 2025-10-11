"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getCocktails } from "@/api/queries/cocktails";
import { CocktailsPagination } from "@/components/common/cocktails-pagination";
import { CocktailDisplay } from "./cocktail-display";
import { CocktailFilters } from "./cocktail-filters";

const ITEMS_PER_PAGE = 24;
const MAX_COCKTAILS = 1_000_000;

export function CocktailsList() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || undefined;
  const glass = searchParams.get("glass") || undefined;
  const alcoholic = searchParams.get("alcoholic")
    ? searchParams.get("alcoholic") === "true"
    : undefined;
  const sort =
    (searchParams.get("sort") as "+id" | "+name" | "+updatedAt") || undefined;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cocktails", category, glass, alcoholic, sort],
    queryFn: () =>
      getCocktails(
        1,
        MAX_COCKTAILS,
        undefined,
        category,
        glass,
        alcoholic,
        sort
      ),
  });

  const filteredCocktails = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    if (!name) {
      return data.data;
    }

    const searchLower = name.toLowerCase();
    return data.data.filter((cocktail) =>
      cocktail.name.toLowerCase().includes(searchLower)
    );
  }, [data?.data, name]);

  const totalPages = Math.ceil(filteredCocktails.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCocktails = filteredCocktails.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Loading cocktails...</div>;
  }

  if (isError) {
    return <div>Error loading cocktails: {error.message}</div>;
  }

  return (
    <div>
      <CocktailFilters />
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedCocktails.map((cocktail) => (
          <CocktailDisplay cocktail={cocktail} key={cocktail.id} />
        ))}
      </div>
      <CocktailsPagination
        currentPage={currentPage}
        firstPage={1}
        lastPage={totalPages}
      />
    </div>
  );
}
