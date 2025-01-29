import { useState, useEffect } from 'react';
import { MOBILE_BREAKPOINT } from '@/utils/constants';

export const useIsMobileDevice = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(true);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileDevice(window.innerWidth < MOBILE_BREAKPOINT);
    };

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return { isMobileDevice };
};
