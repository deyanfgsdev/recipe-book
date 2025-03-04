import { useContext } from 'react';
import { FavouriteRecipesContext } from '@/context/FavouriteRecipesContext';

export const useFavouriteRecipes = () => {
  const context = useContext(FavouriteRecipesContext);

  if (!context) {
    throw new Error(
      'useFavouriteRecipes must be used within a FavouriteRecipesProvider'
    );
  }

  return context;
};
