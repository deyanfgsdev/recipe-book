import { createRoot } from 'react-dom/client';

import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Routes, Route } from 'react-router';
import { App } from '@/App';
import { Home } from '@/pages/Home';
import { Favourites } from '@/pages/Favourites';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
