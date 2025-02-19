import { createRoot } from 'react-dom/client';

import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Routes, Route } from 'react-router';
import { App } from '@/App';
import { HomePage } from '@/pages/HomePage';
import { FavouritesPage } from '@/pages/FavouritesPage';
import { RecipePage } from '@/pages/RecipePage';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="recipe/:sourceUrl" element={<RecipePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
