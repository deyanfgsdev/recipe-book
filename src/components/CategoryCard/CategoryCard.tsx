import { Link } from 'react-router';

export const CategoryCard = ({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) => {
  return (
    <li className="category-card bg-medium-beige rounded-lg p-4 [box-shadow:0_4px_4px_0_rgba(0,0,0,0.25)]">
      <Link
        to={`/category/${name.toLowerCase().split(' ').join('-')}`}
        className="category-card__link"
      >
        <img className="category-card__image" src={imageUrl} alt={name} />
        <h3 className="category-card__name text-bold-grey mt-4 text-center text-2xl font-bold [text-shadow:2px_2px_3px_rgba(54,54,54,0.3)]">
          {name}
        </h3>
      </Link>
    </li>
  );
};
