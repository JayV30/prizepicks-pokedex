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
import PageNotFoundView from './index';

// setup routing
const routes = [
  {
    path: '/',
    element: <PageNotFoundView />,
  },
];

describe('PageNotFoundView', () => {
  it('renders', () => {
    renderWithProviders(<PageNotFoundView />, { store, routes });
    expect(screen.getByTestId('page-not-found-view')).toBeInTheDocument();
  });
});
