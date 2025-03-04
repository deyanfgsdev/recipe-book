import { Outlet } from 'react-router';

import { Header } from '@/components/Header/Header';
import { Toaster } from 'sonner';

import { FavouriteRecipesProvider } from '@/context/FavouriteRecipesProvider';

export const App = () => {
  return (
    <>
      <Header />
      <main className="main bg-light-beige pt-[68px] pb-4">
        <FavouriteRecipesProvider>
          <Outlet />
        </FavouriteRecipesProvider>
      </main>
      <Toaster richColors />
    </>
  );
};
