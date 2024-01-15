import React from 'react';
import {
  screen,
  waitFor,
  render,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
} from 'vitest';
import renderWithProviders from '@/../tests/testUtil';
import store from '@/redux';
import server from '@/../tests/mocks/api/node';
import PokemonBrowse from './index';
import PokemonBrowseLayout from './PokemonBrowseLayout';

// setup routing
const routes = [
  {
    path: '/',
    element: <PokemonBrowse />,
  },
];

const routesWithResults = [
  {
    path: '/',
    element: (
      <PokemonBrowseLayout
        data={{
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              name: 'bulbasaur',
              number: 1,
            },
          ],
        }}
        isError={false}
        isSuccess
        isUninitialized={false}
        isLoading={false}
        getNextPage={() => {}}
      />
    ),
  },
];

// tests
describe('PokemonBrowse Component', () => {
  it('gets the first page of pokemon', async () => {
    let urlCalled: string | null = null;

    server.events.on('request:start', ({ request }) => {
      urlCalled = request.url;
    });
    // render component
    renderWithProviders(<div />, { routes, store });
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    // ensure api was called
    await waitFor(() => {
      expect(urlCalled).toBe('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    });
  });
});

describe('PokemonBrowseLayout Component', () => {
  it('renders the wrapper', () => {
    render(
      <PokemonBrowseLayout
        data={undefined}
        isError={false}
        isSuccess={false}
        isUninitialized={false}
        isLoading={false}
        getNextPage={() => {}}
      />,
    );
    expect(screen.getByTestId('pokemon-browse-list')).toBeInTheDocument();
  });
  it('displays loading when uninitialized', () => {
    render(
      <PokemonBrowseLayout
        data={undefined}
        isError={false}
        isSuccess={false}
        isUninitialized
        isLoading={false}
        getNextPage={() => {}}
      />,
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  it('displays loading when loading', () => {
    render(
      <PokemonBrowseLayout
        data={undefined}
        isError={false}
        isSuccess={false}
        isUninitialized={false}
        isLoading
        getNextPage={() => {}}
      />,
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  it('displays error message when error', () => {
    render(
      <PokemonBrowseLayout
        data={undefined}
        isError
        isSuccess={false}
        isUninitialized={false}
        isLoading={false}
        getNextPage={() => {}}
      />,
    );
    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });
  it('displays pokemon list when success', async () => {
    renderWithProviders(
      <div />,
      { routes: routesWithResults, store },
    );
    await waitFor(() => {
      expect(screen.queryByTestId('pokemon-list-item-1')).toBeInTheDocument();
    });
  });
});
