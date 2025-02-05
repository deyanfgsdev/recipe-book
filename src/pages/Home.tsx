import { useState } from 'react';
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
  const [, setSearchRecipes] = useState<Recipes>(null);

  const homepageHeaderClassName =
    'homepage__header bg-cover bg-center bg-no-repeat flex items-center justify-center';

  const updateSearchRecipes = (
    newRecipes: null | CustomRecipe[] | undefined
  ) => {
    setSearchRecipes(newRecipes);
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
          {randomRecipes && (
            <ul className="recipes-list grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
              {randomRecipes.map((recipe) => (
                <RecipeCard key={recipe.recipeId} recipe={recipe} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
