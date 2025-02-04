import { useState, useEffect } from 'react';

import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';

import { MOBILE_HEADER_IMAGE, DESKTOP_HEADER_IMAGE } from '@/utils/constants';

import { Search } from '@/components/Search/Search';

import type { Recipes } from '@/pages/Home.types';

import { getRandomRecipes } from '@/services/recipes';

export const Home = () => {
  const { isMobileDevice } = useIsMobileDevice();
  const [loading, setLoading] = useState<boolean>(false);
  const [randomRecipes, setRandomRecipes] = useState<Recipes>(null);
  const [, setSearchRecipes] = useState<Recipes>(null);

  const homepageHeaderClassName =
    'homepage__header bg-cover bg-center bg-no-repeat flex items-center justify-center';

  useEffect(() => {
    setLoading(true);

    getRandomRecipes()
      .then((recipes) => {
        if (!recipes) return;

        setRandomRecipes(recipes);
      })
      .catch((error: Error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const updateSearchRecipes = (newRecipes: RecipesState) => {
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
        <section className="homepage-content__recipes">
          {loading && <p>Loading...</p>}
          {randomRecipes && (
            <ul>
              {randomRecipes.map((recipe) => (
                <li key={recipe.recipeId}>
                  <img src={recipe.recipeImage} alt={recipe.recipeTitle} />
                  <h2>{recipe.recipeTitle}</h2>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};
