import {
  configureStore,
} from '@reduxjs/toolkit';
import api from '@/api';
import searchHistorySliceReducer from './slices/searchHistorySlice';
import searchHistoryListenerMiddleware from './middleware/searchHistoryMiddleware';

/**
 * Configure the Redux store with the following:
 * - a searchHistory slice to store an array of search history items
 * - an rtk-query api slice to handle fetch cache from the PokeAPI
 * - rtk-query middleware to handle cache
 * - a custom middleware to handle search history persistence via localforage lib
 */
const store = configureStore({
  reducer: {
    searchHistory: searchHistorySliceReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(api.middleware, searchHistoryListenerMiddleware.middleware)
  ),
});

export default store;

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
