import { useContext } from 'react';
import { RecipeFiltersContext } from '@/context/RecipeFiltersContext';

export const useRecipeFilters = () => {
  const context = useContext(RecipeFiltersContext);

  if (!context) {
    throw new Error(
      'useRecipeFilters must be used within a RecipeFiltersProvider'
    );
  }

  return context;
};
