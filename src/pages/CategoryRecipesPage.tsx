import { useParams } from 'react-router';
import { useCategoryRecipes } from '@/hooks/useCategoryRecipes';
import { useFavouriteRecipes } from '@/hooks/useFavouriteRecipes';

import { Spinner } from '@/components/Spinner/Spinner';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

import { capitalizeWords } from '@/utils/helpers';
import { checkIfRecipeIsFavourite } from '@/utils/favourites';

export const CategoryRecipesPage = () => {
  const { categoryName: category } = useParams();
  const { isLoading, isError, recipes } = useCategoryRecipes({ category });
  const { favouriteRecipes } = useFavouriteRecipes();

  const recipeListClassName =
    'category-recipes-list grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mt-6';

  return (
    <div className="category-recipes-page-content p-4">
      {category && (
        <h1 className="category-recipes-page-content__title text-bold-grey text-center text-[32px] font-bold min-[768px]:text-[40px]">
          Recipes for the category: {capitalizeWords(category)}
        </h1>
      )}
      {isLoading && <Spinner />}
      {!isLoading && (isError || (recipes && recipes.length === 0)) && (
        <p className="no-recipes-found-message text-bold-grey text-center text-xl">
          No recipes found
        </p>
      )}
      {!isLoading && !isError && recipes && recipes.length > 0 && (
        <ul className={recipeListClassName}>
          {recipes.map((recipe) => {
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
      )}
    </div>
  );
};
