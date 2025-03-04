import type { MappedRecipe as Recipe } from '@/services/recipes.types';

import { STORAGE_FAVOURITE_RECIPES_KEYNAME } from '@/utils/constants';

export const getFavouriteRecipesFromStorage = (): Recipe[] => {
  const storageFavouriteRecipes = window.localStorage.getItem(
    STORAGE_FAVOURITE_RECIPES_KEYNAME
  );

  return storageFavouriteRecipes ? JSON.parse(storageFavouriteRecipes) : [];
};

export const saveFavouriteRecipeToStorage = (favouriteRecipe: Recipe) => {
  const storageFavouriteRecipes = window.localStorage.getItem(
    STORAGE_FAVOURITE_RECIPES_KEYNAME
  );
  const storageFavouriteRecipesItems: Recipe[] = storageFavouriteRecipes
    ? JSON.parse(storageFavouriteRecipes)
    : [];

  window.localStorage.setItem(
    STORAGE_FAVOURITE_RECIPES_KEYNAME,
    JSON.stringify([...storageFavouriteRecipesItems, favouriteRecipe])
  );
};

export const removeFavouriteRecipeFromStorage = (favouriteRecipe: Recipe) => {
  const storageFavouriteRecipes: Recipe[] = JSON.parse(
    window.localStorage.getItem(STORAGE_FAVOURITE_RECIPES_KEYNAME)!
  );
  const newFavouriteRecipes = storageFavouriteRecipes.filter(
    (recipe) => recipe.recipeId !== favouriteRecipe.recipeId
  );

  window.localStorage.setItem(
    STORAGE_FAVOURITE_RECIPES_KEYNAME,
    JSON.stringify(newFavouriteRecipes)
  );
};

export const removeAllFavouriteRecipesFromStorage = () => {
  window.localStorage.setItem(
    STORAGE_FAVOURITE_RECIPES_KEYNAME,
    JSON.stringify([])
  );
};
