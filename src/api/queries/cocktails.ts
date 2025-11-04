import type { APIResponse, Cocktail, CocktailGlass } from "@/lib/types";

const API_BASE_URL = "https://cocktails.solvro.pl/api/v1";

export async function getCocktails(
  page = 1,
  perPage = 24,
  name?: string,
  category?: string,
  glass?: string,
  alcoholic?: boolean,
  sort?: "+id" | "+name" | "+updatedAt" | "+glass" | "+category"
): Promise<APIResponse<Cocktail[]>> {
  const params = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });

  if (name) {
    params.append("name", name);
  }
  if (category) {
    params.append("category", category);
  }
  if (glass) {
    params.append("glass", glass);
  }
  if (alcoholic !== undefined) {
    params.append("alcoholic", alcoholic.toString());
  }
  if (sort) {
    params.append("sort", sort);
  }

  const response: Response = await fetch(
    `${API_BASE_URL}/cocktails?${params.toString()}`
  );
  return response.json();
}

export async function getCocktailById(
  id: number
): Promise<APIResponse<Cocktail>> {
  const response: Response = await fetch(`${API_BASE_URL}/cocktails/${id}`);
  return response.json();
}

export async function getCocktailGlasses(): Promise<
  APIResponse<CocktailGlass[]>
> {
  const response: Response = await fetch(`${API_BASE_URL}/cocktails/glasses`);
  return response.json();
}

export async function getCocktailCategories(): Promise<APIResponse<string[]>> {
  const response: Response = await fetch(
    `${API_BASE_URL}/cocktails/categories`
  );
  return response.json();
}
