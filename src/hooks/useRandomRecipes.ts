import { useState, useEffect } from 'react';

import { getRandomRecipes } from '@/services/recipes';

import type { Recipes } from '@/pages/Home.types';

export const useRandomRecipes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [randomRecipes, setRandomRecipes] = useState<Recipes>(null);

  useEffect(() => {
    setLoading(true);

    getRandomRecipes()
      .then((newRandomRecipes) => {
        setRandomRecipes(newRandomRecipes);
      })
      .catch((error: Error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, randomRecipes };
};
