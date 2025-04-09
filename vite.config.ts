import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'react-ai-intent',
      fileName: (format) => `react-ai-intent.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],  // <-- Add this line to prevent React bundling
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
