"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getCocktails } from "@/api/queries/cocktails";
import { favoriteCocktailsAtom } from "@/lib/atoms";
import { CocktailDisplay } from "./cocktail-display";

const PER_PAGE = 1_000_000; // Arbitrary large number to fetch all cocktails

export function FavoritesCocktailsList() {
  const [favoriteCocktails] = useAtom(favoriteCocktailsAtom);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-cocktails"],
    queryFn: () => getCocktails(1, PER_PAGE),
  });

  if (isLoading) {
    return <div>Loading cocktails...</div>;
  }

  if (isError) {
    return <div>Error loading cocktails: {error.message}</div>;
  }

  const favoriteCocktailsList =
    data?.data.filter((cocktail) =>
      favoriteCocktails.has(cocktail.id.toString())
    ) || [];

  if (favoriteCocktailsList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-muted-foreground">
          No favorite cocktails yet. Start adding some!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {favoriteCocktailsList.map((cocktail) => (
        <CocktailDisplay cocktail={cocktail} key={cocktail.id} />
      ))}
    </div>
  );
}
