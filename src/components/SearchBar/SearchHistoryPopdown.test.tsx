import React from 'react';
import {
  screen,
  render,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
} from 'vitest';
import SearchHistoryPopdown from './SearchHistoryPopdown';

// mock functions
const handleSearchItemClick = vi.fn();
const handleRemoveSearchItemClick = vi.fn();
const handleClearSearchHistoryClick = vi.fn();

// tests
describe('SearchHistoryPopdown Component', () => {
  it('should render null if isVisible is false', () => {
    render(
      <SearchHistoryPopdown
        isVisible={false}
        searchHistoryItems={['test']}
        handleSearchItemClick={handleSearchItemClick}
        handleRemoveSearchItemClick={handleRemoveSearchItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />,
    );

    expect(screen.queryByTestId('search-history-popdown')).toBeNull();
  });

  it('should render null if searchHistoryItems is empty', () => {
    render(
      <SearchHistoryPopdown
        isVisible
        searchHistoryItems={[]}
        handleSearchItemClick={handleSearchItemClick}
        handleRemoveSearchItemClick={handleRemoveSearchItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />,
    );

    expect(screen.queryByTestId('search-history-popdown')).toBeNull();
  });

  it('should render a list of search history items', () => {
    render(
      <SearchHistoryPopdown
        isVisible
        searchHistoryItems={['test', 'test2']}
        handleSearchItemClick={handleSearchItemClick}
        handleRemoveSearchItemClick={handleRemoveSearchItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />,
    );

    expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('should call handleSearchItemClick when a search history item is clicked', () => {
    render(
      <SearchHistoryPopdown
        isVisible
        searchHistoryItems={['test', 'test2']}
        handleSearchItemClick={handleSearchItemClick}
        handleRemoveSearchItemClick={handleRemoveSearchItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />,
    );

    screen.getByText('test2').click();

    expect(handleSearchItemClick).toHaveBeenCalledWith('test2');
  });

  it('should call handleRemoveSearchItemClick when a remove button is clicked', () => {
    render(
      <SearchHistoryPopdown
        isVisible
        searchHistoryItems={['test', 'test2']}
        handleSearchItemClick={handleSearchItemClick}
        handleRemoveSearchItemClick={handleRemoveSearchItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />,
    );

    const removeBtns = screen.getAllByRole('button', { name: 'Remove this search item' });
    expect(removeBtns).toHaveLength(2);

    removeBtns[0].click();
    expect(handleRemoveSearchItemClick).toHaveBeenCalledWith('test');

    removeBtns[1].click();
    expect(handleRemoveSearchItemClick).toHaveBeenCalledWith('test2');
  });

  it('should call handleClearSearchHistoryClick when the clear button is clicked', () => {
    render(
      <SearchHistoryPopdown
        isVisible
        searchHistoryItems={['test', 'test2']}
        handleSearchItemClick={handleSearchItemClick}
        handleRemoveSearchItemClick={handleRemoveSearchItemClick}
        handleClearSearchHistoryClick={handleClearSearchHistoryClick}
      />,
    );

    screen.getByRole('button', { name: 'Reset search history' }).click();

    expect(handleClearSearchHistoryClick).toHaveBeenCalled();
  });
});
