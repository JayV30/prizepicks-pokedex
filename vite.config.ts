/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig((env) => ({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    env.mode !== "test" && eslintPlugin(),
  ],
  server: {
    open: 'http://localhost:3000',
    port: 3000,
    host: true,
  },
  base: process.env.BASE_URL,
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: '/src/',
      },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
    clearMocks: true,
  },
}));
