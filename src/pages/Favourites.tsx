import { useFavouritesRecipes } from '@/hooks/useFavouritesRecipes';

import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

import { checkIfRecipeIsFavourite } from '@/utils/favourites';

export const Favourites = () => {
  const { favouritesRecipes } = useFavouritesRecipes();

  const recipeListClassName =
    'favourites-recipes-list grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6';

  return (
    <div className="favourites-page-content p-4">
      <h1 className="favourites-page-content__title text-bold-grey text-center text-[32px] font-bold min-[768px]:text-[40px]">
        Favourites Recipes
      </h1>
      <section className="favourites-page-content__recipes">
        {!favouritesRecipes.length ? (
          <p>No favourite recipes</p>
        ) : (
          <ul className={recipeListClassName}>
            {favouritesRecipes.map((recipe) => {
              const { recipeId } = recipe;
              const isFavouriteRecipe = checkIfRecipeIsFavourite(
                recipeId,
                favouritesRecipes
              );
              return (
                <RecipeCard
                  key={recipeId}
                  recipe={recipe}
                  variant="favourite"
                  isFavouriteRecipe={isFavouriteRecipe}
                />
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};
