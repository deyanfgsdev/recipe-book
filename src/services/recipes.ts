import { SPOONACULAR_API_PREFIX, SPOONACULAR_API_KEY } from '@/utils/constants';
import type {
  SearchRecipesResponse,
  MappedResult as Recipe,
} from '@/services/recipes.types';

export const getSearchRecipes = (
  query: string
): Promise<null | { recipes: Recipe[] }> => {
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
