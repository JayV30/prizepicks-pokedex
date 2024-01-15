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
import SideControls from './index';

describe('SideControls Component', () => {
  it('renders', () => {
    render(<SideControls />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
