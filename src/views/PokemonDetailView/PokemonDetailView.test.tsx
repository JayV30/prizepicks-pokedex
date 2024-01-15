import React from 'react';
import {
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
} from 'vitest';
import renderWithProviders from '@/../tests/testUtil';
import store from '@/redux';
import PokemonDetailView from './index';

// setup routing
const routes = [
  {
    path: '/',
    element: <PokemonDetailView />,
  },
  {
    path: '/:pokemonName',
    element: <PokemonDetailView />,
  },
];

// tests
describe('PokemonDetailView', () => {
  it('renders an article element', () => {
    renderWithProviders(<PokemonDetailView />, { store, routes });
    expect(screen.getByTestId('pokemon-detail-view')).toBeInTheDocument();
  });

  // without a valid pokemonName param, the PokemonDetail component will render 'invalid' text
  it('renders \'Invalid Search\' text without a valid pokemonName param', () => {
    renderWithProviders(<PokemonDetailView />, { store, routes });
    expect(screen.getByText('Invalid Search')).toBeInTheDocument();
    expect(screen.getByTestId('invalid-pokemon-name-text')).toBeInTheDocument();
  });

  // with a valid pokemonName param, the PokemonDetail component will get the pokemon data and render it
  it('renders Pokemon details when there is a valid pokemonName param', async () => {
    const { router } = renderWithProviders(<PokemonDetailView />, { store, routes });
    // navigate to /pikachu
    act(() => {
      router.navigate('/pikachu');
    });
    // should render the loading spinner
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    // wait for the data to load and be displayed
    await waitFor(() => {
      expect(screen.getByTestId('pokemon-detail-stats')).toBeInTheDocument();
      expect(screen.getByTestId('pokemon-detail-image')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
