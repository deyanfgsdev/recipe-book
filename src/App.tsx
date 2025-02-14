import { Outlet } from 'react-router';

import { Header } from '@/components/Header/Header';
import { FavouritesRecipesProvider } from '@/context/FavouritesRecipesProvider';

export const App = () => {
  return (
    <>
      <Header />
      <main className="main bg-light-beige pt-[68px] pb-4">
        <FavouritesRecipesProvider>
          <Outlet />
        </FavouritesRecipesProvider>
      </main>
    </>
  );
};
