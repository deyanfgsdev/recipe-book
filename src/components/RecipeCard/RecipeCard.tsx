import { Link } from 'react-router';

import { FaRegHeart } from 'react-icons/fa';

import type { MappedRecipe as CustomRecipe } from '@/services/recipes.types';

export const RecipeCard = ({
  recipe,
  titleMaxHeight,
  type,
}: {
  recipe: CustomRecipe;
  titleMaxHeight: number;
  type: 'random' | 'result';
}) => {
  const { recipeTitle, recipeImage } = recipe;

  return (
    <li
      className={`recipe-card ${type === 'random' ? 'recipe-card--random' : 'recipe-card--result'}`}
    >
      <img className="recipe-card__image" src={recipeImage} alt={recipeTitle} />
      <div className="recipe-card-info rounded-lg bg-white p-4 [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25)]">
        <h3
          className="recipe-card-info__title text-bold-grey text-lg font-bold"
          style={{ height: titleMaxHeight ? `${titleMaxHeight}px` : 'auto' }}
        >
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
          >
            <FaRegHeart className="text-2xl" />
          </button>
        </div>
      </div>
    </li>
  );
};
