import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCocktailById } from "@/api/queries/cocktails";
import { CocktailDetail } from "@/components/common/cocktail-detail";

type CocktailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CocktailPageProps): Promise<Metadata> {
  const { id } = await params;
  const cocktailId = Number.parseInt(id, 10);

  if (Number.isNaN(cocktailId)) {
    return {
      title: "Cocktail Not Found",
    };
  }

  try {
    const response = await getCocktailById(cocktailId);
    const cocktail = response.data;

    return {
      title: `${cocktail.name} | Cocktails`,
      description:
        cocktail.instructions || `Learn how to make ${cocktail.name}`,
    };
  } catch {
    return {
      title: "Cocktail Not Found",
    };
  }
}

export default async function CocktailPage({ params }: CocktailPageProps) {
  const { id } = await params;
  const cocktailId = Number.parseInt(id, 10);

  if (Number.isNaN(cocktailId)) {
    notFound();
  }

  try {
    const response = await getCocktailById(cocktailId);
    const cocktail = response.data;

    return (
      <div className="container mx-auto px-4 pb-8">
        <CocktailDetail cocktail={cocktail} />
      </div>
    );
  } catch {
    notFound();
  }
}
