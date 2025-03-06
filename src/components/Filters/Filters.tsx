import { useId } from 'react';

export const Filters = () => {
  const readyInMaxMinutesId = useId();
  const dietTypeId = useId();

  return (
    <div className="recipe-filters md:flex md:items-center md:justify-end md:gap-4">
      <div className="recipe-filters__ready-in-minutes flex items-center gap-2">
        <label htmlFor={readyInMaxMinutesId} className="md:text-lg">
          Ready in minutes (max.):
        </label>
        <input
          type="range"
          id={readyInMaxMinutesId}
          min="0"
          max="120"
          className="accent-bold-green"
        />
      </div>
      <div className="recipe-filters__diet-type mt-4 flex items-center gap-2 md:mt-0">
        <label htmlFor={dietTypeId} className="md:text-lg">
          Diet Type:
        </label>
        <select id={dietTypeId} className="md:text-lg">
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
