import { useState, useEffect, useRef } from 'react';

export const useRecipesSearch = () => {
  const [query, setQuery] = useState<string>('');
  const [formSearchErrorMessage, setFormSearchErrorMessage] = useState<
    string | null
  >(null);
  const isFirstInput = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = false;

      return;
    }

    if (!query) {
      setFormSearchErrorMessage("You can't search for an empty query");

      setTimeout(() => {
        setFormSearchErrorMessage(null);
      }, 2000);

      return;
    }

    if (query.length < 3) {
      setFormSearchErrorMessage(
        'Search query must be at least 3 characters long'
      );

      return;
    }

    setFormSearchErrorMessage(null);
  }, [query]);

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  return { query, updateQuery, formSearchErrorMessage };
};
