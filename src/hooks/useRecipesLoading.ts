import { useState, useEffect } from 'react';

import type { Recipes } from '@/pages/Home.types';

export const useRecipesLoading = ({
  randomRecipes,
  searchRecipes,
}: {
  randomRecipes: Recipes;
  searchRecipes: Recipes;
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
