import { useEffect } from 'react';
import localforage from 'localforage';
import { useAppDispatch } from '@/redux/hooks';
import { setSearchHistory } from '@/redux/slices/searchHistorySlice';

// get the search history from localforage and set it in the store
const usePersistedSearchHistory: () => void = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const searchHistory: string[] | null | undefined = await localforage.getItem('searchHistory');
        if (searchHistory) dispatch(setSearchHistory(searchHistory));
      } catch (err) {
        // TODO: possibly log error to error reporting service?

        // eslint-disable-next-line no-console
        console.log('Error getting search history from localforage: ', err);
      }
    };

    getSearchHistory();
  }, [dispatch]);
};

export default usePersistedSearchHistory;
