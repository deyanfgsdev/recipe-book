import { useQuery } from '@tanstack/react-query';
import { getRecipesByCategory } from '@/services/recipes';

export const useCategoryRecipes = ({
  category,
}: {
  category: string | undefined;
}) => {
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

  return { isLoading, isError, recipes };
};
