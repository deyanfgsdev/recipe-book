import { useParams } from 'react-router';
import { useRecipeDetails } from '@/hooks/useRecipeDetails';
import { useFavouriteRecipes } from '@/hooks/useFavouriteRecipes';

import { Spinner } from '@/components/Spinner/Spinner';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { checkIfRecipeIsFavourite } from '@/utils/favourites';
import {
  SPOONACULAR_API_INGREDIENT_IMAGE_PREFIX,
  SPOONACULAR_API_INGREDIENT_IMAGE_SIZE,
} from '@/utils/constants';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

const getRecipeIdFromSourceUrl = (sourceUrl: string) =>
  Number(sourceUrl.split('-').pop());

export const RecipePage = () => {
  const { sourceUrl } = useParams();
  const recipeId = getRecipeIdFromSourceUrl(sourceUrl!);
  const { isLoading, isError, recipeDetails } = useRecipeDetails({ recipeId });
  const { favouriteRecipes, addFavouriteRecipe, removeFavouriteRecipe } =
    useFavouriteRecipes();
  const isFavouriteRecipe = checkIfRecipeIsFavourite(
    recipeId,
    favouriteRecipes
  );
  const mappedRecipeDetails: Recipe = {
    recipeId: recipeId,
    recipeTitle: recipeDetails?.recipeTitle ?? '',
    recipeImage: recipeDetails?.recipeImage ?? '',
    recipeSourceUrl: sourceUrl ?? '',
  };

  return (
    <div className="recipe-page-content mx-auto p-4 xl:max-w-7xl">
      {isLoading && <Spinner />}
      {isError && (
        <p className="no-recipe-found-message text-bold-grey text-center text-xl">
          No recipe found
        </p>
      )}
      {!isLoading && !isError && recipeDetails && (
        <>
          <h1 className="recipe-page-content__title text-bold-grey text-center text-[32px] font-bold md:text-[40px]">
            {recipeDetails.recipeTitle}
          </h1>
          <img
            className="recipe-page-content__image mx-auto mt-6"
            src={recipeDetails.recipeImage}
            alt={recipeDetails.recipeTitle}
          />
          <div className="recipe-page-content__actions mt-6 flex justify-end">
            <button
              type="button"
              className="favourite-recipe-button cursor-pointer"
              onClick={
                isFavouriteRecipe
                  ? () => removeFavouriteRecipe(mappedRecipeDetails)
                  : () => addFavouriteRecipe(mappedRecipeDetails)
              }
            >
              {isFavouriteRecipe ? (
                <FaHeart className="text-fav-red text-2xl" />
              ) : (
                <FaRegHeart className="text-fav-red text-2xl" />
              )}
            </button>
          </div>
          <section className="recipe-page-content-ingredients mt-6">
            <h2 className="recipe-page-content-ingredients__title text-center text-[26px] font-semibold text-black md:text-[28px]">
              Ingredients
            </h2>
            {recipeDetails.recipeIngredients.length === 0 && (
              <p className="no-recipe-ingredients text-bold-grey mt-6 text-center text-xl">
                No ingredients for this recipe
              </p>
            )}
            {recipeDetails.recipeIngredients.length > 0 && (
              <ul className="recipe-ingredients-list mt-4 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center gap-4">
                {recipeDetails.recipeIngredients.map((ingredient) => {
                  const { id, name, image } = ingredient;

                  return (
                    <li
                      className="recipe-ingredient bg-light2-beige flex flex-col items-center justify-between gap-4 rounded-lg p-4 [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25)]"
                      key={id}
                    >
                      <img
                        className="recipe-ingredient__image h-[150px]"
                        src={`${SPOONACULAR_API_INGREDIENT_IMAGE_PREFIX}${SPOONACULAR_API_INGREDIENT_IMAGE_SIZE}/${image}`}
                        alt={name}
                      />
                      <span className="recipe-ingredient__name text-base text-black">
                        {name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
          <section className="recipe-page-content-instructions mt-6">
            <h2 className="recipe-page-content-instructions__title text-center text-[26px] font-semibold text-black md:text-[28px]">
              Instructions
            </h2>
            {recipeDetails.recipeInstructions.includes('</') ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: recipeDetails.recipeInstructions,
                }}
                className="recipe-page-content-instructions__details mt-4 text-base text-black"
              />
            ) : (
              <p className="recipe-page-content-instructions__details mt-4 text-base text-black">
                {recipeDetails.recipeInstructions}
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
};
