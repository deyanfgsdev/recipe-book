import { useState } from 'react';
import { Link } from 'react-router';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const RecipeCard = ({
  recipe,
  type,
}: {
  recipe: Recipe;
  type: 'random' | 'result';
}) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const { recipeTitle, recipeImage } = recipe;

  const handleFavouriteClick = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <li
      className={`recipe-card ${type === 'random' ? 'recipe-card--random' : 'recipe-card--result'}`}
    >
      <img className="recipe-card__image" src={recipeImage} alt={recipeTitle} />
      <div className="recipe-card-info rounded-lg bg-white p-4 [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25)]">
        <h3 className="recipe-card-info__title text-bold-grey h-[28px] truncate text-lg font-bold">
          {recipeTitle}
        </h3>
        <div className="recipe-card-info__actions mt-4 flex items-center justify-between">
          <Link
            to=""
            className="recipe-card-info-action bg-yellow text-bold-grey rounded-lg px-4 py-2 font-medium"
          >
            View Recipe
          </Link>
          <button
            type="button"
            className="recipe-card-info-action cursor-pointer"
            onClick={handleFavouriteClick}
          >
            {isFavourite ? (
              <FaHeart className="text-fav-red text-2xl" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </button>
        </div>
      </div>
    </li>
  );
};
