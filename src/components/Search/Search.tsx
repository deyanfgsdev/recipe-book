import { useRef, useId, memo } from 'react';
import debounce from 'just-debounce-it';

export const Search = memo(
  ({
    query,
    updateQuery,
    formSearchErrorMessage,
    refetch,
  }: {
    query: string;
    updateQuery: (newQuery: string) => void;
    formSearchErrorMessage: string | null;
    refetch: () => void;
  }) => {
    const queryId = useId();
    const prevSearch = useRef('');

    const debounceGetSearchRecipes = debounce(() => {
      refetch();
    }, 300);

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { currentTarget } = event;
      const { value: newQuery } = currentTarget;

      if (newQuery.startsWith(' ')) {
        return;
      }

      prevSearch.current = newQuery;
      updateQuery(newQuery);
      debounceGetSearchRecipes();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (query === prevSearch.current) return;

      debounceGetSearchRecipes();
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
        {formSearchErrorMessage && (
          <span className="search-form__error-message text-red-500">
            {formSearchErrorMessage}
          </span>
        )}
      </form>
    );
  }
);
