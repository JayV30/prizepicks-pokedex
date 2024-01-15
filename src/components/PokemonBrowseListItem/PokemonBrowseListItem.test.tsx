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
import { MemoryRouter } from 'react-router-dom';
import renderWithProviders from '@/../tests/testUtil';
import store from '@/redux';
import PokemonBrowseListItem from './index';
import PokemonBrowseListItemLayout from './PokemonBrowseListItemLayout';

// setup routing
const routes = [
  {
    path: '/',
    element: <PokemonBrowseListItem pokemon="pikachu" number={25} />,
  },
];

const pikachuData = {
  id: 25,
  name: 'pikachu',
  formattedName: 'Pikachu',
  height: '4',
  weight: '60',
  abilities: ['static', 'lightning-rod'],
  types: ['electric'],
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  speciesId: 25,
};

// tests
describe('PokemonBrowseListItem Component', () => {
  it('should render', async () => {
    renderWithProviders(
      <div />,
      { store, routes },
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('pokemon-list-item-25')).toBeInTheDocument();
  });

  it('should navigate to the details page when clicked', async () => {
    renderWithProviders(
      <div />,
      { store, routes },
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('pokemon-list-item-25')).toBeInTheDocument();
    const link = screen.queryByTestId('pokemon-list-item-25')?.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/details/pikachu');
  });
});

describe('PokemonBrowseListItemLayout Component', () => {
  it('should render', async () => {
    render(
      <MemoryRouter>
        <PokemonBrowseListItemLayout
          pokemon="pikachu"
          number={25}
          data={undefined}
          isSuccess={false}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('pokemon-list-item-25')).toBeInTheDocument();
  });

  it('should not render image without the data prop', async () => {
    render(
      <MemoryRouter>
        <PokemonBrowseListItemLayout
          pokemon="pikachu"
          number={25}
          data={undefined}
          isSuccess
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('pokemon-list-item-25')).toBeInTheDocument();
    expect(screen.queryByTestId('pokemon-list-item-img-25')).not.toBeInTheDocument();
  });

  it('should not render image if the isSuccess prop is false', async () => {
    render(
      <MemoryRouter>
        <PokemonBrowseListItemLayout
          pokemon="pikachu"
          number={25}
          data={pikachuData}
          isSuccess={false}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.queryByTestId('pokemon-list-item-25')).toBeInTheDocument();
    expect(screen.queryByTestId('pokemon-list-item-img-25')).not.toBeInTheDocument();
  });

  it('should render image if the isSuccess prop is true and there is data', async () => {
    render(
      <MemoryRouter>
        <PokemonBrowseListItemLayout
          pokemon="pikachu"
          number={25}
          data={pikachuData}
          isSuccess
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('pokemon-list-item-25')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-list-item-img-25')).toBeInTheDocument();
  });
});
