export type Meta = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

export type IngredientType = string | null;

export type Ingredient = {
  id: number;
  name: string;
  description: string | null;
  alcohol: boolean | null;
  type: IngredientType;
  percentage: number | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  measure: string | null;
};

export type CocktailCategory = string | null;

export type CocktailGlass = string | null;

export type Cocktail = {
  id: number;
  name: string;
  instructions: string | null;
  alcoholic: boolean;
  category: CocktailCategory;
  glass: CocktailGlass;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  ingredients?: Ingredient[];
};

export type APIResponse<T> = {
  meta?: Meta;
  data: T;
};
