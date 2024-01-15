import React from 'react';
import SimpleBar from 'simplebar-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiReset } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './searchBar.module.sass';

interface SearchHistoryPopdownProps {
  isVisible: boolean;
  searchHistoryItems?: string[];
  handleSearchItemClick: (searchTerm: string) => void;
  handleRemoveSearchItemClick: (searchTerm: string) => void;
  handleClearSearchHistoryClick: () => void;
}

const defaultProps = {
  searchHistoryItems: [],
};

const motionVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
  },
};

const SearchHistoryPopdown: React.FC<SearchHistoryPopdownProps> = ({
  isVisible,
  searchHistoryItems,
  handleSearchItemClick,
  handleRemoveSearchItemClick,
  handleClearSearchHistoryClick,
}) => (
  <AnimatePresence>
    {
      isVisible && searchHistoryItems?.length ? (
        <motion.div
          data-testid="search-history-popdown"
          className={styles.searchHistoryPopdown}
          variants={motionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <p>
            Your Recent Searches
            <button
              className={styles.clearButton}
              type="button"
              aria-label="Reset search history"
              title="Reset search history"
              onClick={handleClearSearchHistoryClick}
            >
              <BiReset size={18} />
            </button>
          </p>
          <SimpleBar
            autoHide={false}
            style={{ maxHeight: '150px' }}
          >
            <ul>
              {
                searchHistoryItems.map((searchHistoryItem) => (
                  <li key={searchHistoryItem}>
                    <button
                      className={styles.searchHistoryItemButton}
                      type="button"
                      aria-label={`Search again for ${searchHistoryItem}`}
                      title={`Search again for ${searchHistoryItem}`}
                      onClick={() => handleSearchItemClick(searchHistoryItem)}
                    >
                      {searchHistoryItem}
                    </button>
                    <button
                      className={styles.removeButton}
                      type="button"
                      aria-label="Remove this search item"
                      title="Remove this search item"
                      onClick={() => handleRemoveSearchItemClick(searchHistoryItem)}
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </li>
                ))
              }
            </ul>
          </SimpleBar>
        </motion.div>
      ) : null
    }
  </AnimatePresence>
);

SearchHistoryPopdown.defaultProps = defaultProps;

export default SearchHistoryPopdown;
