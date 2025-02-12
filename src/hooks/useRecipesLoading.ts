import { useState, useEffect } from 'react';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const useRecipesLoading = ({
  randomRecipes,
  searchRecipes,
}: {
  randomRecipes: Recipe[];
  searchRecipes: Recipe[];
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const recipes = randomRecipes || searchRecipes;

    if (recipes) {
      setLoading(false);
    }
  }, [randomRecipes, searchRecipes]);

  return { loading };
};
