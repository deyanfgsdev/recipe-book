import { ReactNode } from 'react';
import { useFavouriteRecipesReducer } from '@/hooks/useFavouriteRecipesReducer';

import { FavouriteRecipesContext } from '@/context/FavouriteRecipesContext';

export const FavouriteRecipesProvider = ({
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
    <FavouriteRecipesContext.Provider
      value={{
        favouriteRecipes: state,
        addFavouriteRecipe,
        removeFavouriteRecipe,
        removeAllFavouriteRecipes,
      }}
    >
      {children}
    </FavouriteRecipesContext.Provider>
  );
};
