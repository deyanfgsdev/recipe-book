import { NavLink } from 'react-router';

export const MobileMenu = () => {
  return (
    <nav className="header__mobile-menu-nav">
      <NavLink to="/categories" end>
        Categories
      </NavLink>
      <NavLink to="/favourites" end>
        Favourites Recipes
      </NavLink>
    </nav>
  );
};
