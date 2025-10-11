import { Suspense } from "react";
import { FavoritesCocktailsList } from "@/components/common/favorites-cocktails-list";

export default function FavoritesPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <Suspense fallback={<span>Loading...</span>}>
        <FavoritesCocktailsList />
      </Suspense>
    </div>
  );
}
