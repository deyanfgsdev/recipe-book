import { useParams } from 'react-router';

export const RecipePage = () => {
  const { recipeSource } = useParams();

  return (
    <div>
      <h1>Recipe Details: {recipeSource}</h1>
    </div>
  );
};
