import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  spaceToKebabCase,
  kebabToTitleCase,
} from '@/helpers';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import {
  addSearchHistoryItem,
  removeSearchHistoryItem,
  clearSearchHistory,
} from '@/redux/slices/searchHistorySlice';
import SearchHistoryPopdown from './SearchHistoryPopdown';
import styles from './searchBar.module.sass';

const SearchBar: React.FC = () => {
  const searchHistory = useAppSelector((state) => state.searchHistory.value);
  const dispatch = useAppDispatch();
  const [popdownIsVisible, setPopdownIsVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /**
   * Navigates to the details page with the search term param.
   * The string is converted to kebab case to match the API, then converted to
   * title case for nicer display in the search history.
  */
  const executeSearch: (term?: string) => void = (term) => {
    const valToSearch = term || searchTerm;
    if (valToSearch.trim().length > 0) {
      const st = spaceToKebabCase(valToSearch);
      navigate(`/details/${st}`);
      dispatch(addSearchHistoryItem(kebabToTitleCase(st)));
      setSearchTerm('');
      setPopdownIsVisible(false);
    }
  };

  // Update search term when change in input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Submit search when enter key pressed in input
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') executeSearch();
  };

  // Submit search when search button clicked
  const handleSearchButtonClick = () => {
    executeSearch();
  };

  // Submit search when search history item clicked
  const handleSearchHistoryItemClick = (item: string) => {
    executeSearch(item);
  };

  // Close popdown on clicks outside of this component
  const handleClickOutside = (event: MouseEvent | FocusEvent | TouchEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setPopdownIsVisible(false);
    }
  };

  // Remove search history item
  const handleRemoveSearchHistoryItemClick = (item: string) => {
    dispatch(removeSearchHistoryItem(item));
  };

  // Clear search history
  const handleClearSearchHistoryClick = () => {
    dispatch(clearSearchHistory());
  };

  // Open popdown when input is focused
  const handleInputFocus = () => {
    setPopdownIsVisible(true);
  };

  // Manage event listeners for handling 'clicks' outside of this component
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('focusin', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('focusin', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.searchBar}
    >
      <input
        data-testid="search-input"
        type="text"
        name="search"
        placeholder="Search"
        value={searchTerm}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <button
        data-testid="search-button"
        className={styles.searchButton}
        type="submit"
        tabIndex={0}
        aria-label="Submit Search"
        title="Submit Search"
        onClick={handleSearchButtonClick}
      >
        <AiOutlineSearch size={26} />
      </button>
      <SearchHistoryPopdown
        isVisible={popdownIsVisible}
        handleSearchItemClick={handleSearchHistoryItemClick}
        searchHistoryItems={searchHistory}
        handleRemoveSearchItemClick={handleRemoveSearchHistoryItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />
    </div>
  );
};

export default SearchBar;
