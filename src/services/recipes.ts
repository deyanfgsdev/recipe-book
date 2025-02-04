import { SPOONACULAR_API_PREFIX, SPOONACULAR_API_KEY } from '@/utils/constants';
import type {
  SearchRecipesResponse,
  MappedRecipe as CustomRecipe,
  RandomRecipesResponse,
} from '@/services/recipes.types';

export const getSearchRecipes = (
  query: string
): Promise<null | { recipes: CustomRecipe[] } | undefined> => {
  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch recipes');

      return response.json();
    })
    .then((data: SearchRecipesResponse) => {
      if (!data.results?.length) return null;

      const mappedResults = data.results?.map((result) => {
        const { id, title, image } = result;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
        };
      });

      return { recipes: mappedResults };
    })
    .catch((error: Error) => {
      console.error(error.message);

      return null;
    });
};

export const getRandomRecipes = (
  addRecipeInformation = true,
  recipesNumber = 10
): Promise<null | CustomRecipe[] | undefined> => {
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
        const { id, title, image } = recipe;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
        };
      });

      return mappedRecipes;
    })
    .catch((error: Error) => {
      console.error(error.message);

      return null;
    });
};
