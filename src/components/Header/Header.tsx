import { useState, useEffect } from 'react';

import { MenuMobileButton } from '@/components/Header/MobileMenuButton';
import { MobileMenu } from '@/components/Header/MobileMenu';
import { DesktopMenu } from '@/components/Header/DesktopMenu';

export const Header = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileDevice(window.innerWidth < 992);
    };

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const toogleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="header fixed top-0 z-1 w-full">
      <div className="header__content bg-light-green flex items-center justify-between p-4">
        <div className="header-left flex items-center gap-2">
          <img
            src="https://i.ibb.co/6R4St5T4/recipe-book-logo.png"
            alt="Recipe Book Logo"
            className="header-left__logo"
          />
          <h1 className="header-left__main-title text-bold-green text-[24px] font-bold">
            Recipe Book
          </h1>
        </div>
        <div className="header-right">
          {isMobileDevice ? (
            <MenuMobileButton toogleMobileMenu={toogleMobileMenu} />
          ) : (
            <DesktopMenu />
          )}
        </div>
      </div>
      {isMobileDevice && isMobileMenuOpen && <MobileMenu />}
    </header>
  );
};
