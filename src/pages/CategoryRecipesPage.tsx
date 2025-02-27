import { useParams } from 'react-router';
import { useCategoryRecipes } from '@/hooks/useCategoryRecipes';

export const CategoryRecipesPage = () => {
  const { categoryName: category } = useParams();
  const { isLoading, isError, recipes } = useCategoryRecipes({ category });

  return (
    <div className="category-recipes-page-content p-4">
      <h1>Category: {category}</h1>
    </div>
  );
};
