import { MappedRecipe as Recipe } from '@/services/recipes.types';

export const checkIfRecipeIsFavourite = (
  recipeId: number,
  favouritesRecipes: Recipe[]
) => {
  return favouritesRecipes.some((recipe) => recipe.recipeId === recipeId);
};
