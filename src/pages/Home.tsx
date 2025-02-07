import { useState, useEffect, useRef } from 'react';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { useRandomRecipes } from '@/hooks/useRandomRecipes';

import { MOBILE_HEADER_IMAGE, DESKTOP_HEADER_IMAGE } from '@/utils/constants';

import { Search } from '@/components/Search/Search';
import { RecipeCard } from '@/components/RecipeCard/RecipeCard';

import type { Recipes } from '@/pages/Home.types';
import type { MappedRecipe as CustomRecipe } from '@/services/recipes.types';

export const Home = () => {
  const { isMobileDevice } = useIsMobileDevice();
  const { loading, randomRecipes } = useRandomRecipes();
  const [searchRecipes, setSearchRecipes] = useState<Recipes>(null);
  const [titleMaxHeight, setTitleMaxHeight] = useState<number>(0);
  const recipesListRef = useRef<HTMLUListElement | null>(null);

  const homepageHeaderClassName =
    'homepage__header bg-cover bg-center bg-no-repeat flex items-center justify-center';
  const recipeListClassName =
    'recipes-list grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6';

  useEffect(() => {
    if (!randomRecipes && !searchRecipes) return;

    const calculateTitleMaxHeight = () => {
      const recipesList = recipesListRef.current;

      if (!recipesList) return 0;

      const recipesItems = [...recipesList.querySelectorAll('.recipe-card')];

      const titlesHeights = recipesItems.map((recipeElem) => {
        const titleElem = recipeElem.querySelector('.recipe-card-info__title');

        if (!(titleElem instanceof HTMLElement)) return 0;

        const { offsetHeight } = titleElem;

        return offsetHeight;
      });

      return Math.max(...titlesHeights);
    };

    const newTitleMaxHeight = calculateTitleMaxHeight();
    setTitleMaxHeight(newTitleMaxHeight);
  }, [randomRecipes, searchRecipes]);

  const updateSearchRecipes = (
    newSearchRecipes: null | CustomRecipe[] | undefined
  ) => {
    setSearchRecipes(newSearchRecipes);
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
          <Search updateSearchRecipes={updateSearchRecipes} />
        </section>
        <section className="homepage-content__recipes mt-6">
          {loading && <p>Loading...</p>}
          {randomRecipes && !searchRecipes && (
            <ul ref={recipesListRef} className={recipeListClassName}>
              {randomRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.recipeId}
                  recipe={recipe}
                  titleMaxHeight={titleMaxHeight}
                />
              ))}
            </ul>
          )}
          {searchRecipes && (
            <ul ref={recipesListRef} className={recipeListClassName}>
              {searchRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.recipeId}
                  recipe={recipe}
                  titleMaxHeight={titleMaxHeight}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
