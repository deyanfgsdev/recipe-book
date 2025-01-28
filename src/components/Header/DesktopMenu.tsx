import { NavLink } from 'react-router';

export const DesktopMenu = () => {
  return (
    <nav className="header__desktop-menu-nav">
      <NavLink to="/categories" end>
        Categories
      </NavLink>
      <NavLink to="/favourites" end>
        Favourites Recipes
      </NavLink>
    </nav>
  );
};
