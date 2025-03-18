import { useState, useEffect, useCallback } from 'react';

import { getRandomRecipes } from '@/services/recipes';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

import { MAX_RANDOM_RECIPES, RECIPES_BATCH_SIZE } from '@/utils/constants';

export const useRandomRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState<null | Recipe[]>(null);
  const [hasReachedMaxRandomRecipes, setHasReachedMaxRandomRecipes] =
    useState<boolean>(false);

  useEffect(() => {
    getRandomRecipes()
      .then((newRandomRecipes) => {
        setRandomRecipes(newRandomRecipes);
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (!randomRecipes) return;

    if (randomRecipes.length >= MAX_RANDOM_RECIPES) {
      setHasReachedMaxRandomRecipes(true);
    }
  }, [randomRecipes]);

  const getMoreRandomRecipes = useCallback(() => {
    const currentCount = randomRecipes?.length || 0;
    const remainingToMax = MAX_RANDOM_RECIPES - currentCount;
    const nextBatchSize = Math.min(RECIPES_BATCH_SIZE, remainingToMax);

    getRandomRecipes(nextBatchSize)
      .then((newRandomRecipes) => {
        setRandomRecipes((prevState) => {
          if (!prevState) return newRandomRecipes;

          const uniqueNewRandomRecipes = newRandomRecipes.filter(
            (newRandomRecipe) =>
              !prevState.some(
                (recipe) => recipe.recipeId === newRandomRecipe.recipeId
              )
          );
          const recipesToAdd = uniqueNewRandomRecipes.slice(0, remainingToMax);

          return [...prevState, ...recipesToAdd];
        });
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, [randomRecipes]);

  return {
    randomRecipes,
    getMoreRandomRecipes,
    hasReachedMaxRandomRecipes,
  };
};
