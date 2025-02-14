import { createContext } from 'react';
import type { MappedRecipe as Recipe } from '@/services/recipes.types';

interface FavouritesRecipesContextType {
  favouritesRecipes: Recipe[];
  addFavouriteRecipe: (recipe: Recipe) => void;
  removeFavouriteRecipe: (recipeId: number) => void;
}

export const FavouritesRecipesContext = createContext<
  FavouritesRecipesContextType | undefined
>(undefined);
