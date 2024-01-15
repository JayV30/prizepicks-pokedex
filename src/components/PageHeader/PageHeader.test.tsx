import React from 'react';
import {
  screen,
  render,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
} from 'vitest';
import PageHeader from './index';

describe('PageHeader Component', () => {
  it('renders', () => {
    render(<PageHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Pokedex')).toBeInTheDocument();
  });
});
