import React from 'react';
import {
  // render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
  // vi,
} from 'vitest';
import renderWithProviders from '@/../tests/testUtil';
import store from '@/redux';
import { routes } from '@/router';
import SearchBar from './index';

describe('SearchBar Component', () => {
  it('should render the search input', () => {
    renderWithProviders(<SearchBar />, { store, routes });
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  it('should render the search button', () => {
    renderWithProviders(<SearchBar />, { store, routes });
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
  });

  it('should update the search input value on user input', () => {
    renderWithProviders(<SearchBar />, { store, routes });
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should change the route when Enter is pressed and there is valid input', async () => {
    const { router } = renderWithProviders(<SearchBar />, { store, routes });

    // at home, no pokemon detail view
    expect(router.state.location.pathname).toBe('/');
    expect(screen.queryByTestId('pokemon-detail-view')).not.toBeInTheDocument();

    // change input value and press enter
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // wait for the route to change and the pokemon detail view to render
    await waitFor(() => {
      expect(screen.getByTestId('pokemon-detail-view')).toBeInTheDocument();
      expect(router.state.location.pathname).toBe('/details/test');
    });
  });

  it('should NOT change the route when Enter is pressed and there is invalid input', async () => {
    const { router } = renderWithProviders(<SearchBar />, { store, routes });

    // at home, no pokemon detail view
    expect(router.state.location.pathname).toBe('/');
    expect(screen.queryByTestId('pokemon-detail-view')).not.toBeInTheDocument();

    // change input value and press enter
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyPress(input, { key: 'Enter' });

    // wait for possible route change and pokemon detail view (should not happen)
    await waitFor(() => {
      expect(screen.queryByTestId('pokemon-detail-view')).not.toBeInTheDocument();
      expect(router.state.location.pathname).toBe('/');
    });
  });

  it('should change the route when the submit button is pressed and there is valid input', async () => {
    const { router } = renderWithProviders(<SearchBar />, { store, routes });

    // at home, no pokemon detail view
    expect(router.state.location.pathname).toBe('/');
    expect(screen.queryByTestId('pokemon-detail-view')).not.toBeInTheDocument();

    // change input value and press submit button
    const input: HTMLInputElement = screen.getByTestId('search-input');
    const button: HTMLButtonElement = screen.getByTestId('search-button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    // wait for the route to change and the pokemon detail view to render
    await waitFor(() => {
      expect(screen.getByTestId('pokemon-detail-view')).toBeInTheDocument();
      expect(router.state.location.pathname).toBe('/details/test');
    });
  });

  it('should NOT change the route when the submit button is pressed and there is invalid input', async () => {
    const { router } = renderWithProviders(<SearchBar />, { store, routes });

    // at home, no pokemon detail view
    expect(router.state.location.pathname).toBe('/');
    expect(screen.queryByTestId('pokemon-detail-view')).not.toBeInTheDocument();

    // change input value and press submit button
    const input: HTMLInputElement = screen.getByTestId('search-input');
    const button: HTMLButtonElement = screen.getByTestId('search-button');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    // wait for possible route change and pokemon detail view (should not happen)
    waitFor(() => {
      expect(screen.queryByTestId('pokemon-detail-view')).not.toBeInTheDocument();
      expect(router.state.location.pathname).toBe('/');
    });
  });

  it('should render the search history popdown when the input is focused', async () => {
    renderWithProviders(<SearchBar />, { store, routes });

    // popdown should not be visible
    expect(screen.queryByTestId('search-history-popdown')).not.toBeInTheDocument();

    // focus the input
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.focus(input);

    // wait for the popdown to render
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
    });
  });

  it('should hide the search history popdown when focus is outside of the search wrapper element', async () => {
    renderWithProviders(<SearchBar />, { store, routes });

    // focus the input
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.focus(input);

    // wait for the popdown to render
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
    });

    // focus another element (blur alone won't work in this case)
    const navEle = screen.getByRole('navigation');
    fireEvent.focus(navEle);

    // wait for the popdown to hide
    await waitFor(() => {
      expect(screen.queryByTestId('search-history-popdown')).not.toBeInTheDocument();
    });
  });

  it('should add an entry to the search history when a valid search is submitted', async () => {
    renderWithProviders(<SearchBar />, { store, routes });

    // focus the input
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.focus(input);

    // wait for the popdown to render with no matching entry
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
      expect(screen.queryByText('TestEntry')).not.toBeInTheDocument();
    });

    // change input value and press enter
    fireEvent.change(input, { target: { value: 'TestEntry' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // wait for the details view to render (it autofocuses the close link which will cause the popdown to close if we do not wait)
    await waitFor(() => {
      expect(screen.getByTitle('Back to Pokemon List')).toBeInTheDocument();
    });

    // focus the input to get the popdown to render again
    fireEvent.focus(input);

    // wait for the search history popdown to open
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
    });

    // The resulting text should be slightly differerent than the input text
    expect(screen.getByText('Testentry')).toBeInTheDocument();
  });

  it('should remove an entry from the search history when the remove button is clicked', async () => {
    renderWithProviders(<SearchBar />, { store, routes });

    // focus the input
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.focus(input);

    // wait for the popdown to render with no matching entry
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
      expect(screen.queryByText('TestEntry')).not.toBeInTheDocument();
    });

    // change input value and press enter
    fireEvent.change(input, { target: { value: 'TestEntry' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // wait for the details view to render (it autofocuses the close link which will cause the popdown to close if we do not wait)
    await waitFor(() => {
      expect(screen.getByTitle('Back to Pokemon List')).toBeInTheDocument();
    });

    // focus the input to get the popdown to render again
    fireEvent.focus(input);

    // wait for the search history popdown to open
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
    });

    // ensure the entry is in the search history
    expect(screen.getByText('Testentry')).toBeInTheDocument();

    // find the remove button
    const removeButtons = screen.getAllByTitle('Remove this search item');

    // click the remove button
    fireEvent.click(removeButtons[0]);

    // text should no longer be in the search history
    await waitFor(() => {
      expect(screen.queryByText('Testentry')).not.toBeInTheDocument();
    });
  });

  it('should clear the search history when the clear button is clicked', async () => {
    renderWithProviders(<SearchBar />, { store, routes });

    // focus the input
    const input: HTMLInputElement = screen.getByTestId('search-input');
    fireEvent.focus(input);

    // wait for the popdown to render with no matching entry
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
      expect(screen.queryByText('TestEntry')).not.toBeInTheDocument();
    });

    // change input value and press enter
    fireEvent.change(input, { target: { value: 'TestEntry' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    // wait for the details view to render (it autofocuses the close link which will cause the popdown to close if we do not wait)
    await waitFor(() => {
      expect(screen.getByTitle('Back to Pokemon List')).toBeInTheDocument();
    });

    // focus the input to get the popdown to render again
    fireEvent.focus(input);

    // wait for the search history popdown to open
    await waitFor(() => {
      expect(screen.getByTestId('search-history-popdown')).toBeInTheDocument();
    });

    // ensure the entry is in the search history
    expect(screen.getByText('Testentry')).toBeInTheDocument();

    // find the clear button
    const clearButton = screen.getByTitle('Reset search history');

    // click the clear button
    fireEvent.click(clearButton);

    // text should no longer be in the search history
    await waitFor(() => {
      expect(screen.queryByText('Testentry')).not.toBeInTheDocument();
    });
  });
});
