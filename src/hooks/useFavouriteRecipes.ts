import { useContext } from 'react';
import { FavouritesRecipesContext } from '@/context/FavouritesRecipesContext';

export const useFavouriteRecipes = () => {
  const context = useContext(FavouritesRecipesContext);

  if (!context) {
    throw new Error(
      'useFavouriteRecipes must be used within a FavouritesRecipesProvider'
    );
  }

  return context;
};
