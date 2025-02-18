import { useReducer, ReactNode } from 'react';
import {
  favouriteRecipesInitialState,
  favouriteRecipesReducer,
} from '@/reducers/favouriteRecipes';

import { FavouritesRecipesContext } from '@/context/FavouritesRecipesContext';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const FavouritesRecipesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    favouriteRecipesReducer,
    favouriteRecipesInitialState
  );

  const addFavouriteRecipe = (recipe: Recipe) =>
    dispatch({ type: 'ADD_FAVOURITE_RECIPE', payload: recipe });

  const removeFavouriteRecipe = (recipe: Recipe) =>
    dispatch({ type: 'REMOVE_FAVOURITE_RECIPE', payload: recipe });

  const removeAllFavouriteRecipes = () =>
    dispatch({ type: 'REMOVE_ALL_FAVOURITE_RECIPES' });

  return (
    <FavouritesRecipesContext.Provider
      value={{
        favouritesRecipes: state,
        addFavouriteRecipe,
        removeFavouriteRecipe,
        removeAllFavouriteRecipes,
      }}
    >
      {children}
    </FavouritesRecipesContext.Provider>
  );
};
