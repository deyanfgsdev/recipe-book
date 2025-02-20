import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getRecipeInformation } from '@/services/recipes';

const getRecipeIdFromSourceUrl = (sourceUrl: string) =>
  Number(sourceUrl.split('-').pop());

export const RecipePage = () => {
  const { sourceUrl } = useParams();
  const recipeId = sourceUrl
    ? getRecipeIdFromSourceUrl(sourceUrl)
    : Number(sourceUrl);
  const { isLoading, isError, data } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: async () => await getRecipeInformation(recipeId),
  });

  return (
    <div>
      <h1>Recipe Details: {sourceUrl}</h1>
    </div>
  );
};
