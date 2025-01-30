import { IoIosMenu } from 'react-icons/io';

export const MobileMenuButton = ({
  toogleMobileMenu,
}: {
  toogleMobileMenu: () => void;
}) => {
  const handleMobileMenuClick = () => {
    toogleMobileMenu();
  };

  return (
    <button
      className="header-right__mobile-menu-button text-bold-green flex text-[32px]"
      onClick={handleMobileMenuClick}
    >
      <IoIosMenu />
    </button>
  );
};
