import { useState, useEffect, useId } from 'react';

export const Search = () => {
  const [query, setQuery] = useState<string>('');
  const searchId = useId();

  useEffect(() => {}, [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id={searchId} type="text" value={query} placeholder="Search..." />
    </form>
  );
};
