import { useQuery } from '@tanstack/react-query';
import { getRecipeInformation } from '@/services/recipes';

export const useRecipeDetails = ({ recipeId }: { recipeId: number }) => {
  const {
    isLoading,
    isError,
    data: recipeDetails,
  } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: async () => await getRecipeInformation(recipeId),
  });

  return { isLoading, isError, recipeDetails };
};
