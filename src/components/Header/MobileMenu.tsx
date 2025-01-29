import { NavLink } from 'react-router';

export const MobileMenu = () => {
  const mobileNavLinkClassName =
    'block text-yellow px-[16px] py-[14px] not-first:border-t border-light-green';

  return (
    <nav className="header__mobile-menu-nav bg-bold-green">
      <NavLink to="/categories" end className={mobileNavLinkClassName}>
        Categories
      </NavLink>
      <NavLink to="/favourites" end className={mobileNavLinkClassName}>
        Favourites
      </NavLink>
    </nav>
  );
};
