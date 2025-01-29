import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';

const MOBILE_HEADER_IMAGE = 'https://i.ibb.co/npZ5DZZ/mobile-header-bg.jpg';
const DESKTOP_HEADER_IMAGE = 'https://i.ibb.co/GSnYnBH/desktop-header-bg.jpg';

export const Home = () => {
  const { isMobileDevice } = useIsMobileDevice();

  const homepageHeaderClassName =
    'homepage__header bg-cover bg-center bg-no-repeat flex items-center justify-center';

  return (
    <>
      <header
        className={homepageHeaderClassName}
        style={{
          backgroundImage: `url(${isMobileDevice ? MOBILE_HEADER_IMAGE : DESKTOP_HEADER_IMAGE})`,
          height: isMobileDevice ? '198px' : '241px',
        }}
      >
        <h1 className="homepage__header-title text-center text-[32px] font-bold text-white min-[768px]:text-[40px]">
          Welcome to the Recipe Book
        </h1>
      </header>
      <div className="homepage__content p-4">Homepage Content</div>
    </>
  );
};
