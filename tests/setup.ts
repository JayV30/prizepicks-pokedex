import {
  afterEach,
  beforeAll,
  afterAll,
} from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import server from './mocks/api/node';
import api from '../src/api';

global.ResizeObserver = require('resize-observer-polyfill');

beforeAll(() => {
  server.listen(); // msw server

  // add global.scrollTo b/c it's not in jsdom
  global.scrollTo = () => {
    // do nothing
  };

  // add global.computedStyle b/c it's not in jsdom
  global.getComputedStyle = () => (
    {
      getPropertyValue: (prop) => prop,
    } as CSSStyleDeclaration
  );
});

afterEach(() => {
  server.resetHandlers(); // reset all msw handlers
  server.events.removeAllListeners(); // reset all msw event listeners
  api.util.resetApiState(); // reset rtk query cache
  cleanup();
});

afterAll(() => {
  server.close(); // msw server
});
