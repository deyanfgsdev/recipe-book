import { useState, useCallback } from 'react';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const useSearchRecipes = () => {
  const [searchRecipes, setSearchRecipes] = useState<null | Recipe[]>(null);

  const updateSearchRecipes = useCallback((newSearchRecipes: Recipe[]) => {
    setSearchRecipes(newSearchRecipes);
  }, []);

  return { searchRecipes, updateSearchRecipes };
};
