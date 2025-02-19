import { Link } from 'react-router';
import { useFavouriteRecipes } from '@/hooks/useFavouriteRecipes';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';
import { RecipeCardVariant } from '@/components/RecipeCard/RecipeCard.type';

export const RecipeCard = ({
  recipe,
  variant,
  isFavouriteRecipe,
}: {
  recipe: Recipe;
  variant: RecipeCardVariant;
  isFavouriteRecipe: boolean;
}) => {
  const { recipeId, recipeTitle, recipeImage, recipeSourceUrl } = recipe;
  const { addFavouriteRecipe, removeFavouriteRecipe } = useFavouriteRecipes();

  return (
    <li className={`recipe-card recipe-card--${variant}`}>
      <img className="recipe-card__image" src={recipeImage} alt={recipeTitle} />
      <div className="recipe-card-info rounded-lg bg-white p-4 [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25)]">
        <h3 className="recipe-card-info__title text-bold-grey h-[28px] truncate text-lg font-bold">
          {recipeTitle}
        </h3>
        <div className="recipe-card-info__actions mt-4 flex items-center justify-between">
          <Link
            to={`/recipe/${recipeSourceUrl ? recipeSourceUrl : recipeId}`}
            className="recipe-card-info-action bg-yellow text-bold-grey rounded-lg px-4 py-2 font-medium"
          >
            View Recipe
          </Link>
          <button
            type="button"
            className="recipe-card-info-action cursor-pointer"
            onClick={
              isFavouriteRecipe
                ? () => removeFavouriteRecipe(recipe)
                : () => addFavouriteRecipe(recipe)
            }
          >
            {isFavouriteRecipe ? (
              <FaHeart className="text-fav-red text-2xl" />
            ) : (
              <FaRegHeart className="text-fav-red text-2xl" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
};
