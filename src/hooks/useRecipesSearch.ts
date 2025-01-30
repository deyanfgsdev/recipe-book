import { useState, useEffect, useRef } from 'react';

export const useRecipesSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const isFirstInput = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = false;

      return;
    }

    if (!query) {
      setSearchError("You can't search for an empty query");

      setTimeout(() => {
        setSearchError(null);
      }, 2000);

      return;
    }

    if (query.length < 3) {
      setSearchError('Search query must be at least 3 characters long');

      return;
    }

    setSearchError(null);
  }, [query]);

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  return { query, updateQuery, searchError };
};
