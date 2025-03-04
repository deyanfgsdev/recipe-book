import { useFavouriteRecipes } from '@/hooks/useFavouriteRecipes';

import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

import { checkIfRecipeIsFavourite } from '@/utils/favourites';

export const FavouritesPage = () => {
  const { favouriteRecipes, removeAllFavouriteRecipes } = useFavouriteRecipes();

  const recipeListClassName =
    'favourites-recipes-list grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mt-6';

  return (
    <div className="favourites-page-content p-4">
      <h1 className="favourites-page-content__title text-bold-grey text-center text-[32px] font-bold min-[768px]:text-[40px]">
        Favourites Recipes
      </h1>
      <section className="favourites-page-content__recipes">
        {!favouriteRecipes.length ? (
          <p className="no-fav-recipes-message text-bold-grey mt-6 text-center text-xl">
            No favourite recipes, please add some!
          </p>
        ) : (
          <>
            <div className="remove-all-favourites flex justify-end">
              <button
                type="button"
                className="remove-all-favourites__button cursor-pointer rounded-lg border border-red-500 px-4 py-2 font-medium text-red-500"
                onClick={removeAllFavouriteRecipes}
              >
                Remove all favourites
              </button>
            </div>
            <ul className={recipeListClassName}>
              {favouriteRecipes.map((recipe) => {
                const { recipeId } = recipe;
                const isFavouriteRecipe = checkIfRecipeIsFavourite(
                  recipeId,
                  favouriteRecipes
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
          </>
        )}
      </section>
    </div>
  );
};
