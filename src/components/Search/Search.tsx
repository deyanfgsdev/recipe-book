import { useState, useEffect, useRef, useId } from 'react';

export const Search = () => {
  const [query, setQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const isFirstInput = useRef<boolean>(true);
  const queryId = useId();

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = false;

      return;
    }

    if (!query) {
      setSearchError("You can't search for an empty query");

      return;
    }

    if (query.length < 3) {
      setSearchError('Search query must be at least 3 characters long');

      return;
    }

    setSearchError(null);
  }, [query]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    const { value: newQuery } = currentTarget;

    if (newQuery.startsWith(' ')) {
      return;
    }

    setQuery(newQuery);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="search-form flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        id={queryId}
        className="search-form__input placeholder:text-light-grey border-light-grey w-full rounded-lg border bg-white p-4 text-black"
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
