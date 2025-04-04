import { SPOONACULAR_API_PREFIX, SPOONACULAR_API_KEY } from '@/utils/constants';
import { capitalizeWords } from '@/utils/helpers';
import type {
  SearchRecipesResponse,
  MappedRecipe as Recipe,
  SearchRecipesData,
  RandomRecipesResponse,
  RecipeInformationResponse,
  MappedRecipeDetails as RecipeInformation,
} from '@/services/recipes.types';

export const getSearchRecipes = (
  query: string,
  addRecipeInformation = true,
  expectedResultsNumber = 10,
  page = 0
): Promise<SearchRecipesData> => {
  const offset = page * expectedResultsNumber;

  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&addRecipeInformation=${addRecipeInformation}&number=${expectedResultsNumber}&offset=${offset}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch recipes');

      return response.json();
    })
    .then((data: SearchRecipesResponse) => {
      const { results, totalResults } = data;

      const mappedResults = results?.map((result) => {
        const {
          id,
          title,
          image,
          spoonacularSourceUrl,
          readyInMinutes,
          vegetarian,
          vegan,
          glutenFree,
          dairyFree,
          veryHealthy,
        } = result;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
          recipeSourceUrl: spoonacularSourceUrl.split('/').pop()!,
          recipeReadyInMinutes: readyInMinutes,
          isVegetarianRecipe: vegetarian,
          isVeganRecipe: vegan,
          isGlutenFreeRecipe: glutenFree,
          isDairyFreeRecipe: dairyFree,
          isVeryHealthyRecipe: veryHealthy,
        };
      });

      return { recipes: mappedResults ?? [], totalResults };
    })
    .catch((error: Error) => {
      console.error(error.message);

      return { recipes: [], totalResults: 0 };
    });
};

export const getRandomRecipes = (recipesNumber = 10): Promise<Recipe[]> => {
  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/random?apiKey=${SPOONACULAR_API_KEY}&number=${recipesNumber}`
  )
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch random recipes');

      return response.json();
    })
    .then((data: RandomRecipesResponse) => {
      const { recipes } = data;

      const mappedRecipes = recipes?.map((recipe) => {
        const {
          id,
          title,
          image,
          spoonacularSourceUrl,
          readyInMinutes,
          vegetarian,
          vegan,
          glutenFree,
          dairyFree,
          veryHealthy,
        } = recipe;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
          recipeSourceUrl: spoonacularSourceUrl.split('/').pop()!,
          recipeReadyInMinutes: readyInMinutes,
          isVegetarianRecipe: vegetarian,
          isVeganRecipe: vegan,
          isGlutenFreeRecipe: glutenFree,
          isDairyFreeRecipe: dairyFree,
          isVeryHealthyRecipe: veryHealthy,
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

      const recipeIngredients = extendedIngredients
        ? [
            ...new Set(extendedIngredients.map((ingredient) => ingredient.id)),
          ].map((ingredientId) => {
            const ingredientInfo = extendedIngredients.find(
              (ingred) => ingred.id === ingredientId
            );
            const {
              id,
              name,
              image,
              measures: {
                metric: { amount, unitShort },
              },
            } = ingredientInfo;

            return {
              id,
              name,
              image,
              amount,
              unitShort,
            };
          })
        : [];

      return {
        recipeTitle: title,
        recipeImage: image,
        recipeIngredients,
        recipeInstructions: instructions,
      };
    })
    .catch((error: Error) => {
      console.error(error.message);

      return null;
    });
};

export const getRecipesByCategory = (
  category: string,
  addRecipeInformation = true,
  recipesNumber = 10
): Promise<Recipe[]> => {
  return fetch(
    `${SPOONACULAR_API_PREFIX}/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&type=${category.includes('-') ? encodeURIComponent(category.split('-').join(' ')) : category}&addRecipeInformation=${addRecipeInformation}&number=${recipesNumber}`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `Failed to fetch recipes by category: ${capitalizeWords(category)}`
        );

      return response.json();
    })
    .then((data: SearchRecipesResponse) => {
      const { results } = data;

      const mappedResults = results?.map((result) => {
        const {
          id,
          title,
          image,
          spoonacularSourceUrl,
          readyInMinutes,
          vegetarian,
          vegan,
          glutenFree,
          dairyFree,
          veryHealthy,
        } = result;

        return {
          recipeId: id,
          recipeTitle: title,
          recipeImage: image,
          recipeSourceUrl: spoonacularSourceUrl.split('/').pop()!,
          recipeReadyInMinutes: readyInMinutes,
          isVegetarianRecipe: vegetarian,
          isVeganRecipe: vegan,
          isGlutenFreeRecipe: glutenFree,
          isDairyFreeRecipe: dairyFree,
          isVeryHealthyRecipe: veryHealthy,
        };
      });

      return mappedResults ?? [];
    })
    .catch((error: Error) => {
      console.error(error.message);

      return [];
    });
};
