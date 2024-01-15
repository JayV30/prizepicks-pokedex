import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import {
  RouterProvider,
  createMemoryRouter,
  RouteObject,
} from 'react-router-dom';
import { VirtuosoGridMockContext } from 'react-virtuoso';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';

// This type interface extends the default options for render from RTL, as well
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  routes: RouteObject[];
  store: EnhancedStore;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store,
    routes,
    ...renderOptions
  } : ExtendedRenderOptions,
) => {
  // setup routing
  const r = createMemoryRouter(routes);

  // set up a mock context for react-virtuoso to display list items
  const virtuosoVal = {
    viewportHeight: 800,
    itemHeight: 300,
    viewportWidth: 800,
    itemWidth: 300,
  };

  // create a wrapper
  const Wrapper: React.FC = () => (
    <HelmetProvider>
      <VirtuosoGridMockContext.Provider
        value={virtuosoVal}
      >
        <Provider store={store}>
          <RouterProvider router={r} />
        </Provider>
      </VirtuosoGridMockContext.Provider>
    </HelmetProvider>
  );

  // Return an object all of RTL's query functions
  return {
    store,
    router: r,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export default renderWithProviders;
