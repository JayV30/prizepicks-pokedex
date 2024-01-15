import {
  isAnyOf,
} from '@reduxjs/toolkit';
import localforage from 'localforage';
import {
  listenerMiddleware,
  startAppListening,
} from './listenerMiddleware';
import type { RootState } from '../index';
import {
  addSearchHistoryItem,
  removeSearchHistoryItem,
  clearSearchHistory,
} from '../slices/searchHistorySlice';

const searchHistoryListenerMiddleware = listenerMiddleware;

startAppListening({
  matcher: isAnyOf(addSearchHistoryItem, removeSearchHistoryItem, clearSearchHistory),
  effect: (_action, listenerApi) => {
    // localforage is configured in the root index.ts file to ensure availability
    // localforage is async but we don't care about awaiting the result
    localforage.setItem(
      'searchHistory',
      (listenerApi.getState() as RootState).searchHistory.value,
    );
  },
});

export default searchHistoryListenerMiddleware;
