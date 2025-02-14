import { useState, ReactNode } from 'react';

import { FavouritesRecipesContext } from '@/context/FavouritesRecipesContext';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const FavouritesRecipesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favouritesRecipes, setFavouritesRecipes] = useState<Recipe[]>([]);

  const addFavouriteRecipe = (recipe: Recipe) => {
    setFavouritesRecipes((prevState) => [...prevState, recipe]);
  };

  const removeFavouriteRecipe = (recipeId: number) => {
    setFavouritesRecipes((prevState) =>
      prevState.filter((recipe) => recipe.recipeId !== recipeId)
    );
  };

  return (
    <FavouritesRecipesContext.Provider
      value={{
        favouritesRecipes,
        addFavouriteRecipe,
        removeFavouriteRecipe,
      }}
    >
      {children}
    </FavouritesRecipesContext.Provider>
  );
};
