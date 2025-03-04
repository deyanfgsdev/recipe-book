import { useReducer, useCallback } from 'react';
import {
  favouriteRecipesInitialState,
  favouriteRecipesReducer,
} from '@/reducers/favouriteRecipes';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const useFavouriteRecipesReducer = () => {
  const [state, dispatch] = useReducer(
    favouriteRecipesReducer,
    favouriteRecipesInitialState
  );

  const addFavouriteRecipe = useCallback(
    (recipe: Recipe) =>
      dispatch({ type: 'ADD_FAVOURITE_RECIPE', payload: recipe }),
    []
  );

  const removeFavouriteRecipe = useCallback(
    (recipe: Recipe) =>
      dispatch({ type: 'REMOVE_FAVOURITE_RECIPE', payload: recipe }),
    []
  );

  const removeAllFavouriteRecipes = () =>
    dispatch({ type: 'REMOVE_ALL_FAVOURITE_RECIPES' });

  return {
    state,
    addFavouriteRecipe,
    removeFavouriteRecipe,
    removeAllFavouriteRecipes,
  };
};
