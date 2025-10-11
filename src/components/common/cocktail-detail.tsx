import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Cocktail } from "@/lib/types";

type CocktailDetailProps = {
  cocktail: Cocktail;
};

export function CocktailDetail({ cocktail }: CocktailDetailProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Left side - Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        {cocktail.imageUrl ? (
          <Image
            alt={cocktail.name}
            className="object-cover"
            fill
            priority
            src={cocktail.imageUrl}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>

      {/* Right side - Details */}
      <div className="flex flex-col gap-6">
        {/* Name */}
        <h1 className="font-bold text-4xl">{cocktail.name}</h1>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={cocktail.alcoholic ? "default" : "secondary"}>
            {cocktail.alcoholic ? "Alcoholic" : "Non-Alcoholic"}
          </Badge>
          {cocktail.glass && <Badge variant="outline">{cocktail.glass}</Badge>}
          {cocktail.category && (
            <Badge variant="outline">{cocktail.category}</Badge>
          )}
        </div>

        {/* Description/Instructions */}
        {cocktail.instructions && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {cocktail.instructions}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Ingredients */}
        {cocktail.ingredients && cocktail.ingredients.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cocktail.ingredients.map((ingredient) => (
                  <li
                    className="flex items-start justify-between gap-4"
                    key={ingredient.id}
                  >
                    <span className="text-muted-foreground">
                      {ingredient.name}
                    </span>
                    {ingredient.measure && (
                      <span className="flex-shrink-0 font-medium text-sm">
                        {ingredient.measure}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
