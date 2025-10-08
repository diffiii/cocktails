import type { APIResponse, Cocktail } from "@/lib/types";

const API_BASE_URL = "https://cocktails.solvro.pl/api/v1/cocktails";

export async function getCocktails(page = 1): Promise<APIResponse<Cocktail[]>> {
  const response: Response = await fetch(`${API_BASE_URL}?page=${page}`);
  return response.json();
}

export async function getCocktailById(
  id: number
): Promise<APIResponse<Cocktail>> {
  const response: Response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
}
