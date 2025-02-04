import { Link } from 'react-router';

import type { MappedRecipe as CustomRecipe } from '@/services/recipes.types';

export const RecipeCard = ({ recipe }: { recipe: CustomRecipe }) => {
  const { recipeTitle, recipeImage } = recipe;

  return (
    <li>
      <img src={recipeImage} alt={recipeTitle} />
      <h3>{recipeTitle}</h3>
      <div className="recipe-card__actions">
        <Link to="">View Recipe</Link>
        <button type="button">Add to Favorites</button>
      </div>
    </li>
  );
};
