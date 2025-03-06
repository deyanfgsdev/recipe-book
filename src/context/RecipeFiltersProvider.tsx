import { ReactNode } from 'react';
import { useState } from 'react';

import { RecipeFiltersContext } from '@/context/RecipeFiltersContext';

export const RecipeFiltersProvider = ({
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
    <RecipeFiltersContext.Provider
      value={{
        filters,
        updateReadyInMaxMinutes,
        updateDietType,
      }}
    >
      {children}
    </RecipeFiltersContext.Provider>
  );
};
