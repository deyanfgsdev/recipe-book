import { RECIPE_CATEGORIES } from '@/utils/constants';

import { CategoryCard } from '@/components/CategoryCard/CategoryCard';

export const CategoriesPage = () => {
  const categoriesListClassName =
    'recipe-categories-list grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mt-6';

  return (
    <div className="categories-page-content p-4">
      <h1 className="categories-page-content__title text-bold-grey text-center text-[32px] font-bold min-[768px]:text-[40px]">
        Categories
      </h1>
      <section className="categories-page-content__recipe-categories">
        <ul className={categoriesListClassName}>
          {RECIPE_CATEGORIES.map((category) => {
            const { id, name, imageUrl } = category;

            return <CategoryCard key={id} name={name} imageUrl={imageUrl} />;
          })}
        </ul>
      </section>
    </div>
  );
};
