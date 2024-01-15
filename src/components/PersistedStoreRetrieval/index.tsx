import React from 'react';
import usePersistedSearchHistory from '@/hooks/usePersistedSearchHistory';

/**
 * this component should only be rendered once, as close to the root of the
 * Redux store Provider as possible. It's sole purpose is to trigger the retrieval
 * of items from browser storage and dispatch them to the Redux store.
 * */
const PersistedStoreRetrieval: React.FC = () => {
  usePersistedSearchHistory();

  return null;
};

export default PersistedStoreRetrieval;
