import React from 'react';
import {
  screen,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
} from 'vitest';
import renderWithProviders from '@/../tests/testUtil';
import store from '@/redux';
import HomeView from './index';

// setup routing
const routes = [
  {
    path: '/',
    element: <HomeView />,
  },
];

// tests
describe('HomeView', () => {
  it('renders a main element', () => {
    renderWithProviders(<HomeView />, { store, routes });
    expect(screen.getByTestId('home-view')).toBeInTheDocument();
  });
});
