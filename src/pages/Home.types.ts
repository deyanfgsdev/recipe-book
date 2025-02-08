import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export type RandomRecipes = null | Recipe[];
export interface SearchRecipes {
  searchError: string | null;
  recipes: null | Recipe[];
}
