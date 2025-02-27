import { useParams } from 'react-router';

export const CategoryRecipesPage = () => {
  const { categoryName } = useParams();

  return (
    <div>
      <h1>Category: {categoryName}</h1>
    </div>
  );
};
