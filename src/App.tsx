import { Outlet } from 'react-router';

import { Header } from '@/components/Header/Header';

export const App = () => {
  return (
    <>
      <Header />
      <main className="main px-4 pt-[84px] pb-4">
        <Outlet />
      </main>
    </>
  );
};
