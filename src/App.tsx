import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router } from '@remix-run/router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { Store } from 'redux';
import PersistedStoreRetrieval from '@/components/PersistedStoreRetrieval';

interface AppProps {
  store: Store;
  router: Router;
}

// api and router passed as props for improved testability
const App: React.FC<AppProps> = ({ store, router }) => (
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistedStoreRetrieval />
      <RouterProvider router={router} />
    </ReduxProvider>
  </HelmetProvider>
);

export default App;
