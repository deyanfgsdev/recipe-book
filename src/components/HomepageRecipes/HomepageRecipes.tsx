import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

import { checkIfRecipeIsFavourite } from '@/utils/favourites';

import { MappedRecipe as Recipe } from '@/services/recipes.types';

const NoRecipesFound = () => {
  return (
    <p className="no-recipes-found-message text-bold-grey text-center text-xl">
      No recipes found
    </p>
  );
};

const RecipeList = ({
  filteredRandomRecipes,
  filteredSearchRecipes,
  favouriteRecipes,
}: {
  filteredRandomRecipes: Recipe[];
  filteredSearchRecipes: Recipe[];
  favouriteRecipes: Recipe[];
}) => {
  return (
    <ul className="recipes-list grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
      {filteredRandomRecipes.length > 0 &&
        filteredSearchRecipes.length === 0 &&
        filteredRandomRecipes.map((recipe) => {
          const { recipeId } = recipe;
          const isFavouriteRecipe = checkIfRecipeIsFavourite(
            recipeId,
            favouriteRecipes
          );

          return (
            <RecipeCard
              key={recipeId}
              recipe={recipe}
              variant="random"
              isFavouriteRecipe={isFavouriteRecipe}
            />
          );
        })}
      {filteredSearchRecipes.length > 0 &&
        filteredSearchRecipes.map((recipe) => {
          const { recipeId } = recipe;
          const isFavouriteRecipe = checkIfRecipeIsFavourite(
            recipeId,
            favouriteRecipes
          );

          return (
            <RecipeCard
              key={recipeId}
              recipe={recipe}
              variant="result"
              isFavouriteRecipe={isFavouriteRecipe}
            />
          );
        })}
    </ul>
  );
};

export const HomepageRecipes = ({
  query,
  formSearchErrorMessage,
  filteredRandomRecipes,
  filteredSearchRecipes,
  favouriteRecipes,
}: {
  query: string;
  formSearchErrorMessage: string | null;
  filteredRandomRecipes: Recipe[];
  filteredSearchRecipes: Recipe[];
  favouriteRecipes: Recipe[];
}) => {
  return formSearchErrorMessage ||
    (query.length >= 3 && filteredSearchRecipes.length === 0) ||
    (!query && filteredRandomRecipes.length === 0) ? (
    <NoRecipesFound />
  ) : (
    <RecipeList
      filteredRandomRecipes={filteredRandomRecipes}
      filteredSearchRecipes={filteredSearchRecipes}
      favouriteRecipes={favouriteRecipes}
    />
  );
};
