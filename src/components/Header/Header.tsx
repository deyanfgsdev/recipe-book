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
    <header className="header">
      <div className="header__content bg-light-green flex items-center justify-between p-4">
        <img src="vite.svg" alt="Recipe Book Logo" />
        {isMobileDevice ? (
          <MenuMobileButton toogleMobileMenu={toogleMobileMenu} />
        ) : (
          <DesktopMenu />
        )}
      </div>
      {isMobileDevice && isMobileMenuOpen && <MobileMenu />}
    </header>
  );
};
