import { useState, useRef, useCallback } from 'react';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { useRandomRecipes } from '@/hooks/useRandomRecipes';
import { useRecipesSearch } from '@/hooks/useRecipesSearch';
import { useRecipesLoading } from '@/hooks/useRecipesLoading';
import { useFavouriteRecipes } from '@/hooks/useFavouriteRecipes';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';

import { MOBILE_HEADER_IMAGE, DESKTOP_HEADER_IMAGE } from '@/utils/constants';
import { checkIfRecipeIsFavourite } from '@/utils/favourites';

import { Search } from '@/components/Search/Search';
import { Filters } from '@/components/Filters/Filters';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';
import { Spinner } from '@/components/Spinner/Spinner';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const HomePage = () => {
  const { isMobileDevice } = useIsMobileDevice();
  const { randomRecipes } = useRandomRecipes();
  const { query, updateQuery, formSearchErrorMessage } = useRecipesSearch();
  const [searchRecipes, setSearchRecipes] = useState<null | Recipe[]>(null);
  const { loading } = useRecipesLoading({ randomRecipes, searchRecipes });
  const recipesListRef = useRef<HTMLUListElement | null>(null);
  const { favouriteRecipes } = useFavouriteRecipes();
  const { filterRecipes } = useRecipeFilters();

  const updateSearchRecipes = useCallback((newSearchRecipes: Recipe[]) => {
    setSearchRecipes(newSearchRecipes);
  }, []);

  const filteredRandomRecipes =
    (randomRecipes ?? []).length > 0 ? filterRecipes(randomRecipes!) : null;
  const filteredSearchRecipes =
    (searchRecipes ?? []).length > 0 ? filterRecipes(searchRecipes!) : null;

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
            updateSearchRecipes={updateSearchRecipes}
          />
        </section>
        <section className="homepage-content__recipe-filters mt-6">
          <Filters />
        </section>
        <section className="homepage-content__recipes mt-6">
          {loading && <Spinner />}
          {!loading && (
            <>
              {formSearchErrorMessage ||
              (searchRecipes && searchRecipes.length === 0) ||
              filteredSearchRecipes?.length === 0 ? (
                <p className="no-recipes-found-message text-bold-grey text-center text-xl">
                  No recipes found
                </p>
              ) : (
                <>
                  {((filteredRandomRecipes &&
                    filteredRandomRecipes.length > 0) ||
                    (filteredSearchRecipes &&
                      filteredSearchRecipes.length > 0)) && (
                    <ul
                      ref={recipesListRef}
                      className="recipes-list grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6"
                    >
                      {filteredRandomRecipes &&
                        filteredRandomRecipes.length > 0 &&
                        !searchRecipes &&
                        filteredRandomRecipes.map((recipe) => {
                          const { recipeId } = recipe;
                          const isFavouriteRecipe = checkIfRecipeIsFavourite(
                            recipeId,
                            favouriteRecipes
                          );

                          return (
                            <RecipeCard
                              key={recipeId}
                              recipe={recipe}
                              variant="random"
                              isFavouriteRecipe={isFavouriteRecipe}
                            />
                          );
                        })}
                      {filteredSearchRecipes &&
                        filteredSearchRecipes.length > 0 &&
                        filteredSearchRecipes.map((recipe) => {
                          const { recipeId } = recipe;
                          const isFavouriteRecipe = checkIfRecipeIsFavourite(
                            recipeId,
                            favouriteRecipes
                          );

                          return (
                            <RecipeCard
                              key={recipeId}
                              recipe={recipe}
                              variant="result"
                              isFavouriteRecipe={isFavouriteRecipe}
                            />
                          );
                        })}
                    </ul>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};
