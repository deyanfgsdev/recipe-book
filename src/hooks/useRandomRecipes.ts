import { useState, useEffect } from 'react';

import { getRandomRecipes } from '@/services/recipes';

import type { Recipes } from '@/pages/Home.types';

export const useRandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState<Recipes>(null);

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
