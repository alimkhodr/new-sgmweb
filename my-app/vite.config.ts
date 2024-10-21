import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material/Tooltip'
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../certs/selfsigned.key')),
      cert: fs.readFileSync(path.resolve(__dirname, '../certs/selfsigned.crt')),
    },
    proxy: {
      '^/mfgsvr': {
        target: 'http://10.251.42.75',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mfgsvr/, ''),
      },
    },
  },
});
