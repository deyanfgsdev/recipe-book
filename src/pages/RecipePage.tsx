import { useParams } from 'react-router';

export const RecipePage = () => {
  const { sourceUrl } = useParams();

  return (
    <div>
      <h1>Recipe Details: {sourceUrl}</h1>
    </div>
  );
};
