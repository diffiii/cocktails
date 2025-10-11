import type { APIResponse, Ingredient } from "@/lib/types";

const API_BASE_URL = "https://cocktails.solvro.pl/api/v1";

export async function getIngredientById(
  id: number
): Promise<APIResponse<Ingredient>> {
  const response: Response = await fetch(`${API_BASE_URL}/ingredients/${id}`);
  return response.json();
}
