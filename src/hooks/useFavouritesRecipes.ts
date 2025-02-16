import { useContext } from 'react';
import { FavouritesRecipesContext } from '@/context/FavouritesRecipesContext';

export const useFavouritesRecipes = () => {
  const context = useContext(FavouritesRecipesContext);

  if (!context) {
    throw new Error(
      'useFavouritesRecipes must be used within a FavouritesRecipesProvider'
    );
  }

  return context;
};
