import { IoIosMenu } from 'react-icons/io';

export const MenuMobileButton = ({
  toogleMobileMenu,
}: {
  toogleMobileMenu: () => void;
}) => {
  const handleMobileMenuClick = () => {
    toogleMobileMenu();
  };

  return (
    <button
      className="header__mobile-menu-button"
      onClick={handleMobileMenuClick}
    >
      <IoIosMenu />
    </button>
  );
};
