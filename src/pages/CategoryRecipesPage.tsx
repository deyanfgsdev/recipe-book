import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getRecipesByCategory } from '@/services/recipes';

export const CategoryRecipesPage = () => {
  const { categoryName: category } = useParams();
  const {
    isLoading,
    isError,
    data: recipes,
  } = useQuery({
    queryKey: ['categoryRecipes', category],
    queryFn: async () => {
      try {
        if (!category) throw new Error('Category is required');

        return await getRecipesByCategory(category);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    },
  });

  return (
    <div className="category-recipes-page-content p-4">
      <h1>Category: {category}</h1>
    </div>
  );
};
