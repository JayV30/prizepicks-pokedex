import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  describe,
  it,
  expect,
} from 'vitest';
import App from '@/App';
import store from '@/redux';
import router from '@/router';

describe('App', () => {
  it('renders a main element', () => {
    render(<App store={store} router={router} />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('renders the home view', () => {
    render(<App store={store} router={router} />);
    expect(screen.getByTestId('home-view')).toBeInTheDocument();
  });
});
