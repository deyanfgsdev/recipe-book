import { useId, ChangeEvent } from 'react';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';

export const Filters = () => {
  const readyInMaxMinutesId = useId();
  const dietTypeId = useId();
  const { filters, updateReadyInMaxMinutes, updateDietType } =
    useRecipeFilters();

  const handleChangeReadyInMaxMinutes = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value: newReadyInMaxMinutes } = event.target;
    updateReadyInMaxMinutes(newReadyInMaxMinutes);
  };

  const handleChangeDietType = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value: newDietType } = event.target;
    updateDietType(newDietType);
  };

  return (
    <div className="recipe-filters md:flex md:items-center md:justify-end md:gap-4">
      <div className="recipe-filters-ready-in-minutes flex items-center gap-2">
        <label
          htmlFor={readyInMaxMinutesId}
          className="recipe-filters-ready-in-minutes__label md:text-lg"
        >
          Ready in minutes (max.):
        </label>
        <input
          type="range"
          id={readyInMaxMinutesId}
          min="0"
          max="120"
          className="recipe-filters-ready-in-minutes__input accent-bold-green"
          value={filters.readyInMaxMinutes}
          onChange={handleChangeReadyInMaxMinutes}
        />
        <span className="recipe-filters-ready-in-minutes__info">
          {filters.readyInMaxMinutes}
        </span>
      </div>
      <div className="recipe-filters-diet-type mt-4 flex items-center gap-2 md:mt-0">
        <label
          htmlFor={dietTypeId}
          className="recipe-filters-diet-type__label md:text-lg"
        >
          Diet Type:
        </label>
        <select
          id={dietTypeId}
          className="recipe-filters-diet-type__select md:text-lg"
          value={filters.dietType}
          onChange={handleChangeDietType}
        >
          <option value="all">All</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="glutenFree">Gluten Free</option>
          <option value="dairyFree">Dairy Free</option>
          <option value="veryHealthy">Very Healthy</option>
        </select>
      </div>
    </div>
  );
};
