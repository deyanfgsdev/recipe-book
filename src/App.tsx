import { Outlet } from 'react-router';

import { Header } from '@/components/Header/Header';

export const App = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};
