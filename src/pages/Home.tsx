import { useState, useRef } from 'react';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { useRandomRecipes } from '@/hooks/useRandomRecipes';
import { useRecipesSearch } from '@/hooks/useRecipesSearch';
import { useRecipesLoading } from '@/hooks/useRecipesLoading';
import { useFavouritesRecipes } from '@/hooks/useFavouritesRecipes';

import { MOBILE_HEADER_IMAGE, DESKTOP_HEADER_IMAGE } from '@/utils/constants';

import { Search } from '@/components/Search/Search';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const Home = () => {
  const { isMobileDevice } = useIsMobileDevice();
  const { randomRecipes } = useRandomRecipes();
  const { query, updateQuery, formSearchErrorMessage } = useRecipesSearch();
  const [searchRecipes, setSearchRecipes] = useState<null | Recipe[]>(null);
  const { loading } = useRecipesLoading({ randomRecipes, searchRecipes });
  const recipesListRef = useRef<HTMLUListElement | null>(null);
  const { favouritesRecipes } = useFavouritesRecipes();

  const homepageHeaderClassName =
    'homepage__header bg-cover bg-center bg-no-repeat flex items-center justify-center';
  const recipeListClassName =
    'recipes-list grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6';

  const updateSearchRecipes = (newSearchRecipes: Recipe[]) => {
    setSearchRecipes(newSearchRecipes);
  };

  const checkIfRecipeIsFavourite = (recipeId: number) => {
    return favouritesRecipes.some((recipe) => recipe.recipeId === recipeId);
  };

  return (
    <>
      <header
        className={homepageHeaderClassName}
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
        <section className="homepage-content__recipes mt-6">
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              {formSearchErrorMessage || searchRecipes?.length === 0 ? (
                <p>No recipes found</p>
              ) : (
                <>
                  {((randomRecipes && randomRecipes.length > 0) ||
                    (searchRecipes && searchRecipes.length > 0)) && (
                    <ul ref={recipesListRef} className={recipeListClassName}>
                      {randomRecipes &&
                        randomRecipes.length > 0 &&
                        !searchRecipes &&
                        randomRecipes.map((recipe) => {
                          const { recipeId } = recipe;
                          const isFavouriteRecipe =
                            checkIfRecipeIsFavourite(recipeId);

                          return (
                            <RecipeCard
                              key={recipe.recipeId}
                              recipe={recipe}
                              type="random"
                              isFavouriteRecipe={isFavouriteRecipe}
                            />
                          );
                        })}
                      {searchRecipes &&
                        searchRecipes.length > 0 &&
                        searchRecipes.map((recipe) => {
                          const { recipeId } = recipe;
                          const isFavouriteRecipe =
                            checkIfRecipeIsFavourite(recipeId);

                          return (
                            <RecipeCard
                              key={recipe.recipeId}
                              recipe={recipe}
                              type="result"
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
