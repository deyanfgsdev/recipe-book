import { SPOONACULAR_API_PREFIX, SPOONACULAR_API_KEY } from '@/utils/constants';
import type {
  SearchRecipesResponse,
  MappedRecipe as Recipe,
  RandomRecipesResponse,
  RecipeInformationResponse,
  MappedRecipeDetails as RecipeInformation,
} from '@/services/recipes.types';

export const getSearchRecipes = (
  query: string,
  addRecipeInformation = true,
  recipesNumber = 10
): Promise<Recipe[]> => {
  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=${addRecipeInformation}&number=${recipesNumber}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch recipes');

      return response.json();
    })
    .then((data: SearchRecipesResponse) => {
      const { results } = data;

      const mappedResults = results?.map((result) => {
        const { id, title, image, spoonacularSourceUrl } = result;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
          recipeSourceUrl: spoonacularSourceUrl.split('/').pop() ?? '',
        };
      });

      return mappedResults ?? [];
    })
    .catch((error: Error) => {
      console.error(error.message);

      return [];
    });
};

export const getRandomRecipes = (
  addRecipeInformation = true,
  recipesNumber = 10
): Promise<Recipe[]> => {
  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/random?apiKey=${SPOONACULAR_API_KEY}&addRecipeInformation=${addRecipeInformation}&number=${recipesNumber}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch random recipes');

      return response.json();
    })
    .then((data: RandomRecipesResponse) => {
      const { recipes } = data;

      const mappedRecipes = recipes?.map((recipe) => {
        const { id, title, image, spoonacularSourceUrl } = recipe;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
          recipeSourceUrl: spoonacularSourceUrl.split('/').pop() ?? '',
        };
      });

      return mappedRecipes ?? [];
    })
    .catch((error: Error) => {
      console.error(error.message);

      return [];
    });
};

export const getRecipeInformation = (
  recipeId: number
): Promise<RecipeInformation | null> => {
  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch recipe information');

      return response.json();
    })
    .then((data: RecipeInformationResponse) => {
      const { title, image, extendedIngredients, instructions } = data;

      if (!title || !image || !instructions) return null;

      return {
        recipeTitle: title,
        recipeImage: image,
        recipeIngredients:
          extendedIngredients?.map((ingredient) => ({
            name: ingredient.name,
            image: ingredient.image,
          })) ?? [],
        recipeInstructions: instructions,
      };
    })
    .catch((error: Error) => {
      console.error(error.message);

      return null;
    });
};
