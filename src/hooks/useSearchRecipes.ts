import { useCallback } from 'react';
import { useSearchRecipesQuery } from '@/hooks/useSearchRecipesQuery';

export const useSearchRecipes = ({ query }: { query: string }) => {
  const {
    searchRecipes,
    hasNextPage: hasMoreSearchRecipes,
    fetchNextPage: fetchMoreSearchRecipes,
    refetch,
  } = useSearchRecipesQuery({
    query,
  });

  const updateSearchRecipes = useCallback(() => {
    refetch();
  }, [refetch]);

  const getMoreSearchRecipes = useCallback(() => {
    fetchMoreSearchRecipes();
  }, [fetchMoreSearchRecipes]);

  return {
    searchRecipes,
    updateSearchRecipes,
    hasMoreSearchRecipes,
    getMoreSearchRecipes,
  };
};
