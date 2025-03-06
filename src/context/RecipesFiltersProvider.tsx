import { ReactNode } from 'react';
import { useState } from 'react';

import { RecipesFiltersContext } from '@/context/RecipesFiltersContext';

export const RecipesFiltersProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState({
    readyInMaxMinutes: '30',
    dietType: 'all',
  });

  const updateReadyInMaxMinutes = (newReadyInMaxMinutes: string) => {
    setFilters((prevState) => ({
      ...prevState,
      readyInMaxMinutes: newReadyInMaxMinutes,
    }));
  };

  const updateDietType = (newDietType: string) => {
    setFilters((prevState) => ({
      ...prevState,
      dietType: newDietType,
    }));
  };

  return (
    <RecipesFiltersContext.Provider
      value={{
        readyInMaxMinutes: filters.readyInMaxMinutes,
        dietType: filters.dietType,
        updateReadyInMaxMinutes,
        updateDietType,
      }}
    >
      {children}
    </RecipesFiltersContext.Provider>
  );
};
