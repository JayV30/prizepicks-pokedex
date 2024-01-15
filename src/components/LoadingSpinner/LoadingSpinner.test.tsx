import React from 'react';
import {
  screen,
  render,
  waitFor,
} from '@testing-library/react';
import {
  describe,
  it,
  expect,
} from 'vitest';
import LoadingSpinner from './index';

describe('LoadingSpinner Component', () => {
  it('is not visible when not loading', () => {
    render(<LoadingSpinner isLoading={false} />);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('is visible when loading', () => {
    render(<LoadingSpinner isLoading />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('visibility is toggled by isLoading prop', async () => {
    const { rerender } = render(<LoadingSpinner isLoading={false} />);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    rerender(<LoadingSpinner isLoading />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    rerender(<LoadingSpinner isLoading={false} />);
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
