import { useState, useEffect } from 'react';

import { getRandomRecipes } from '@/services/recipes';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const useRandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState<null | Recipe[]>(null);

  useEffect(() => {
    getRandomRecipes()
      .then((newRandomRecipes) => {
        setRandomRecipes(newRandomRecipes);
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, []);

  return { randomRecipes };
};
