import { createContext } from 'react';
import type { MappedRecipe as Recipe } from '@/services/recipes.types';

interface FavouriteRecipesContextType {
  favouriteRecipes: Recipe[];
  addFavouriteRecipe: (recipe: Recipe) => void;
  removeFavouriteRecipe: (recipe: Recipe) => void;
  removeAllFavouriteRecipes: () => void;
}

export const FavouriteRecipesContext = createContext<
  FavouriteRecipesContextType | undefined
>(undefined);
