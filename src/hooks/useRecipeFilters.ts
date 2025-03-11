import { useContext, useCallback } from 'react';
import { RecipeFiltersContext } from '@/context/RecipeFiltersContext';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

interface DietPropertyMap {
  vegetarian: 'isVegetarianRecipe';
  vegan: 'isVeganRecipe';
  glutenFree: 'isGlutenFreeRecipe';
  dairyFree: 'isDairyFreeRecipe';
  veryHealthy: 'isVeryHealthyRecipe';
}

export const useRecipeFilters = () => {
  const context = useContext(RecipeFiltersContext);

  if (!context) {
    throw new Error(
      'useRecipeFilters must be used within a RecipeFiltersProvider'
    );
  }

  const { filters, updateReadyInMaxMinutes, updateDietType } = context;

  const filterRecipes = useCallback(
    (recipes: Recipe[]) => {
      return recipes.filter((recipe) => {
        const passesTimeFilter =
          recipe.recipeReadyInMinutes <= Number(filters.readyInMaxMinutes);

        if (filters.dietType === 'all') return passesTimeFilter;

        const dietPropertyMap: DietPropertyMap = {
          vegetarian: 'isVegetarianRecipe',
          vegan: 'isVeganRecipe',
          glutenFree: 'isGlutenFreeRecipe',
          dairyFree: 'isDairyFreeRecipe',
          veryHealthy: 'isVeryHealthyRecipe',
        };

        const propertyName =
          dietPropertyMap[filters.dietType as keyof DietPropertyMap];

        return passesTimeFilter && recipe[propertyName as keyof Recipe];
      });
    },
    [filters]
  );

  return {
    filters,
    filterRecipes,
    updateReadyInMaxMinutes,
    updateDietType,
  };
};
