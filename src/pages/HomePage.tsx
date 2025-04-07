import { useMemo } from 'react';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { useRandomRecipes } from '@/hooks/useRandomRecipes';
import { useRecipesSearch } from '@/hooks/useRecipesSearch';
import { useSearchRecipes } from '@/hooks/useSearchRecipes';
import { useRecipesLoading } from '@/hooks/useRecipesLoading';
import { useFavouriteRecipes } from '@/hooks/useFavouriteRecipes';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';

import { MOBILE_HEADER_IMAGE, DESKTOP_HEADER_IMAGE } from '@/utils/constants';

import { Search } from '@/components/Search/Search';
import { Filters } from '@/components/Filters/Filters';
import { HomepageRecipes } from '@/components/HomepageRecipes/HomepageRecipes';
import { Spinner } from '@/components/Spinner/Spinner';

export const HomePage = () => {
  const { isMobileDevice } = useIsMobileDevice();
  const { randomRecipes, getMoreRandomRecipes, hasReachedMaxRandomRecipes } =
    useRandomRecipes();
  const { query, updateQuery, formSearchErrorMessage } = useRecipesSearch();
  const { searchRecipes, hasMoreSearchRecipes, getMoreSearchRecipes, refetch } =
    useSearchRecipes({ query });
  const { loading } = useRecipesLoading({ randomRecipes, searchRecipes });
  const { favouriteRecipes } = useFavouriteRecipes();
  const { filterRecipes } = useRecipeFilters();

  const filteredRandomRecipes =
    useMemo(
      () => filterRecipes(randomRecipes),
      [randomRecipes, filterRecipes]
    ) ?? [];
  const filteredSearchRecipes =
    useMemo(
      () => filterRecipes(searchRecipes),
      [searchRecipes, filterRecipes]
    ) ?? [];

  return (
    <>
      <header
        className="homepage__header flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${isMobileDevice ? MOBILE_HEADER_IMAGE : DESKTOP_HEADER_IMAGE})`,
          height: isMobileDevice ? '198px' : '241px',
        }}
      >
        <h1 className="homepage__header-title text-center text-[32px] font-bold text-white min-[768px]:text-[40px]">
          Welcome to the Recipe Book
        </h1>
      </header>
      <div className="homepage-content p-4">
        <section className="homepage-content__search">
          <Search
            query={query}
            updateQuery={updateQuery}
            formSearchErrorMessage={formSearchErrorMessage}
            refetch={refetch}
          />
        </section>
        <section className="homepage-content__recipe-filters mt-6">
          <Filters />
        </section>
        <section className="homepage-content__recipes mt-6">
          {!loading && (
            <HomepageRecipes
              query={query}
              formSearchErrorMessage={formSearchErrorMessage}
              filteredRandomRecipes={filteredRandomRecipes}
              filteredSearchRecipes={filteredSearchRecipes}
              favouriteRecipes={favouriteRecipes}
            />
          )}

          {loading && <Spinner />}
          {!loading &&
            !formSearchErrorMessage &&
            ((query.length >= 3 &&
              filteredSearchRecipes.length > 0 &&
              hasMoreSearchRecipes) ||
              (query.length === 0 &&
                filteredRandomRecipes.length > 0 &&
                !hasReachedMaxRandomRecipes)) && (
              <div className="load-more-button-container mt-6 flex justify-center">
                <button
                  className={`${filteredSearchRecipes.length > 0 ? 'search' : 'random'}-recipes-load-more-button bg-bold-green text-yellow cursor-pointer rounded-lg px-4 py-2 font-medium`}
                  onClick={
                    query.length >= 3
                      ? () => getMoreSearchRecipes()
                      : () => getMoreRandomRecipes()
                  }
                >
                  Load more
                </button>
              </div>
            )}
        </section>
      </div>
    </>
  );
};
