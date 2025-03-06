import { createContext } from 'react';

interface RecipeFiltersContextType {
  readyInMaxMinutes: string;
  dietType: string;
  updateReadyInMaxMinutes: (newReadyInMaxMinutes: string) => void;
  updateDietType: (newDietType: string) => void;
}

export const RecipeFiltersContext = createContext<
  RecipeFiltersContextType | undefined
>(undefined);
