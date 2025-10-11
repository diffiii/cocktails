import { atomWithStorage } from "jotai/utils";

export const favoriteCocktailsAtom = atomWithStorage<Set<string>>(
  "favorite-cocktails",
  new Set<string>(),
  {
    getItem: (key) => {
      const item = localStorage.getItem(key);

      if (!item) {
        return new Set<string>();
      }

      try {
        const parsed = JSON.parse(item) as string[];
        return new Set(parsed);
      } catch {
        return new Set<string>();
      }
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify([...value]));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);
