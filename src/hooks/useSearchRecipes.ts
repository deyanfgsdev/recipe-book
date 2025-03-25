import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchRecipes } from '@/services/recipes';

export const useSearchRecipes = ({ query }: { query: string }) => {
  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['searchRecipes', query],
    queryFn: async ({ pageParam }) =>
      await getSearchRecipes(query, true, 10, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage * 10 < lastPage.totalResults ? nextPage : undefined;
    },
    enabled: query.length >= 3,
  });

  const searchRecipes = data?.pages?.flatMap((page) => page.recipes) ?? [];

  return {
    searchRecipes,
    hasMoreSearchRecipes: hasNextPage,
    getMoreSearchRecipes: fetchNextPage,
    refetch,
  };
};
