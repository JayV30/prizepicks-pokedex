import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomeView from '@/views/HomeView';
import PageNotFoundView from '@/views/PageNotFoundView';
// code split / lazy loaded routes
const PokemonDetailView = lazy(() => import('@/views/PokemonDetailView'));

export const routes = [
  {
    path: '/',
    element: <HomeView />,
    errorElement: <PageNotFoundView />,
    children: [ // nested routes, rendered in <Outlet /> in parent
      {
        path: 'details/:pokemonName',
        element: (
          <React.Suspense fallback={null}>
            <PokemonDetailView />
          </React.Suspense>
        ),
      },
    ],
  },
];

// define all routes here
const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_ROUTER_BASENAME,
});

export default router;
