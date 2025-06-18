import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: [
      'foodorder-backend-jif9.onrender.com', // ✅ This is the one you want
      '.onrender.com'                         // (Optional) allows any *.onrender.com
    ],
  },
});
