import { createContext } from 'react';

interface Filters {
  readyInMaxMinutes: string;
  dietType: string;
}

interface RecipeFiltersContextType {
  filters: Filters;
  updateReadyInMaxMinutes: (newReadyInMaxMinutes: string) => void;
  updateDietType: (newDietType: string) => void;
}

export const RecipeFiltersContext = createContext<
  RecipeFiltersContextType | undefined
>(undefined);
