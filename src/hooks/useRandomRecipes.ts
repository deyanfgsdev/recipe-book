import { useState, useEffect, useCallback } from 'react';

import { getRandomRecipes } from '@/services/recipes';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const useRandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getRandomRecipes()
      .then((newRandomRecipes) => {
        setRandomRecipes(newRandomRecipes);
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, []);

  const getMoreRandomRecipes = useCallback(() => {
    getRandomRecipes()
      .then((newRandomRecipes) => {
        setRandomRecipes((prevState) => {
          const uniqueNewRandomRecipes = newRandomRecipes.filter(
            (newRandomRecipe) =>
              !prevState.some(
                (recipe) => recipe.recipeId === newRandomRecipe.recipeId
              )
          );

          return [...prevState, ...uniqueNewRandomRecipes];
        });
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, []);

  return { randomRecipes, getMoreRandomRecipes };
};
