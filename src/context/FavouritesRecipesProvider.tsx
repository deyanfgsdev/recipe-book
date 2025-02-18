import { ReactNode } from 'react';
import { useFavouriteRecipesReducer } from '@/hooks/useFavouriteRecipesReducer';

import { FavouritesRecipesContext } from '@/context/FavouritesRecipesContext';

export const FavouritesRecipesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    state,
    addFavouriteRecipe,
    removeFavouriteRecipe,
    removeAllFavouriteRecipes,
  } = useFavouriteRecipesReducer();

  return (
    <FavouritesRecipesContext.Provider
      value={{
        favouriteRecipes: state,
        addFavouriteRecipe,
        removeFavouriteRecipe,
        removeAllFavouriteRecipes,
      }}
    >
      {children}
    </FavouritesRecipesContext.Provider>
  );
};
