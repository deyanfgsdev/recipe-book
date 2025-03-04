import { NavLink } from 'react-router';

export const DesktopMenu = () => {
  const desktopNavLinkClassName = 'text-bold-green text-[16px] font-bold';

  return (
    <nav className="header-right__desktop-menu-nav flex gap-2">
      <NavLink to="/categories" className={desktopNavLinkClassName}>
        Categories
      </NavLink>
      <NavLink to="/favourites" end className={desktopNavLinkClassName}>
        Favourites
      </NavLink>
    </nav>
  );
};
