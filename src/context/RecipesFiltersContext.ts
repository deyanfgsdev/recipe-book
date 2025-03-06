import { createContext } from 'react';

interface RecipesFiltersContextType {
  readyInMaxMinutes: string;
  dietType: string;
  updateReadyInMaxMinutes: (newReadyInMaxMinutes: string) => void;
  updateDietType: (newDietType: string) => void;
}

export const RecipesFiltersContext = createContext<
  RecipesFiltersContextType | undefined
>(undefined);
