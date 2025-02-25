import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { App } from '@/App';
import { HomePage } from '@/pages/HomePage';
import { FavouritesPage } from '@/pages/FavouritesPage';
import { RecipePage } from '@/pages/RecipePage';
import { CategoriesPage } from '@/pages/CategoriesPage';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="recipe/:sourceUrl" element={<RecipePage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
