import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Cocktail } from "@/lib/types";
import { FavoriteButton } from "./favorite-button";

export function CocktailDisplay({ cocktail }: { cocktail: Cocktail }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center space-x-4">
        <div>
          <CardTitle>{cocktail.name}</CardTitle>
          <CardDescription>{cocktail.category}</CardDescription>
        </div>
        <FavoriteButton cocktailId={cocktail.id.toString()} />
      </CardHeader>
      <CardAction className="flex w-full items-center justify-center">
        <Link href={`/cocktail/${cocktail.id}`}>
          <Image
            alt={cocktail.name}
            height={700}
            src={cocktail.imageUrl || "/placeholder.svg"}
            width={700}
          />
        </Link>
      </CardAction>
      <CardContent className="flex-1">
        <p className="line-clamp-3">
          {cocktail.instructions || "No instructions available."}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <span className="text-muted-foreground text-sm">
          Glass: {cocktail.glass || "N/A"}
        </span>
        <Badge className="ml-auto" variant="secondary">
          {cocktail.alcoholic ? "Alcoholic" : "Non-Alcoholic"}
        </Badge>
      </CardFooter>
    </Card>
  );
}
