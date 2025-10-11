"use client";

import { useAtom } from "jotai";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { favoriteCocktailsAtom } from "@/lib/atoms";

export function FavoriteButton({ cocktailId }: { cocktailId: string }) {
  const [favorites, setFavorites] = useAtom(favoriteCocktailsAtom);
  const isFavorite = favorites.has(cocktailId);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(cocktailId)) {
        newFavorites.delete(cocktailId);
      } else {
        newFavorites.add(cocktailId);
      }
      return newFavorites;
    });
  };

  return (
    <Button
      className="ml-auto"
      onClick={toggleFavorite}
      size="icon"
      variant="outline"
    >
      <Heart
        className={`h-4 w-4 ${isFavorite ? "fill-current text-pink-500" : ""}`}
      />
    </Button>
  );
}
