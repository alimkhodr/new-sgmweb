import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../server-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../server-cert.pem')),
    },
  },
});
