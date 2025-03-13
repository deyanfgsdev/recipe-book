import { useState, useEffect } from 'react';

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

  const getMoreRandomRecipes = () => {
    getRandomRecipes()
      .then((newRandomRecipes) => {
        const uniqueNewRandomRecipes = newRandomRecipes.filter(
          (newRandomRecipe) =>
            !randomRecipes.some(
              (recipe) => recipe.recipeId === newRandomRecipe.recipeId
            )
        );

        setRandomRecipes((prevState) => [
          ...prevState,
          ...uniqueNewRandomRecipes,
        ]);
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  };

  return { randomRecipes, getMoreRandomRecipes };
};
