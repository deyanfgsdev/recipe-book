import { useId } from 'react';
import debounce from 'just-debounce-it';

import { useRecipesSearch } from '@/hooks/useRecipesSearch';

import { getSearchRecipes } from '@/services/recipes';

import type { MappedRecipe as Recipe } from '@/services/recipes.types';

export const Search = ({
  updateSearchRecipes,
}: {
  updateSearchRecipes: (newRecipes: Recipe[]) => void;
}) => {
  const { query, updateQuery, searchError } = useRecipesSearch();
  const queryId = useId();

  const debounceGetSearchRecipes = debounce((newQuery: string) => {
    getSearchRecipes(newQuery).then((newRecipes: Recipe[]) => {
      updateSearchRecipes(newRecipes);
    });
  }, 300);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { value: newQuery } = currentTarget;

    if (newQuery.startsWith(' ')) {
      return;
    }

    updateQuery(newQuery);
    debounceGetSearchRecipes(newQuery);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    debounceGetSearchRecipes(query);
  };

  return (
    <form
      className="search-form mx-auto flex flex-col gap-2 md:max-w-[553px] xl:max-w-[650px]"
      onSubmit={handleSubmit}
    >
      <input
        id={queryId}
        className="search-form__input placeholder:text-light-grey border-light-grey rounded-lg border bg-white p-4 text-black [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25)]"
        type="text"
        value={query}
        placeholder="Red Velvet Cupcake, Chicken Alfredo..."
        onChange={handleQueryChange}
      />
      {searchError && (
        <span className="search-form__error-message text-red-500">
          {searchError}
        </span>
      )}
    </form>
  );
};
