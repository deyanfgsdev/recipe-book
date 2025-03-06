import { createContext } from 'react';

interface RecipesFiltersContextType {
  readyInMaxMinutes: string;
  dietType: string;
}

export const RecipesFiltersContext = createContext<
  RecipesFiltersContextType | undefined
>(undefined);
