import { toast } from 'sonner';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const favouriteRecipesInitialState: Recipe[] = [];

type ActionType =
  | { type: 'ADD_FAVOURITE_RECIPE'; payload: Recipe }
  | { type: 'REMOVE_FAVOURITE_RECIPE'; payload: Recipe }
  | { type: 'REMOVE_ALL_FAVOURITE_RECIPES' };

export const favouriteRecipesReducer = (
  state: typeof favouriteRecipesInitialState,
  action: ActionType
) => {
  const { type: actionType } = action;

  switch (actionType) {
    case 'ADD_FAVOURITE_RECIPE': {
      const { payload: actionPayload } = action;
      const { recipeId } = actionPayload;
      const isRecipeAlreadyFavourite = state.some(
        (item) => item.recipeId === recipeId
      );

      const newState = isRecipeAlreadyFavourite
        ? state
        : [...state, actionPayload];

      toast.success('Recipe added to favourites!');

      return newState;
    }

    case 'REMOVE_FAVOURITE_RECIPE': {
      const { payload: actionPayload } = action;
      const { recipeId } = actionPayload;

      const newState = state.filter((item) => item.recipeId !== recipeId);

      toast.success('Recipe removed from favourites!');

      return newState;
    }

    case 'REMOVE_ALL_FAVOURITE_RECIPES': {
      toast.success('All recipes removed from favourites!');

      return [];
    }
  }
};
