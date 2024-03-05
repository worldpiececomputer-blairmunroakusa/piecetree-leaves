import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({

  // ↓↓↓ change to logLevel: 'info' ↓↓↓
  logLevel: 'warn',
  // ↑↑↑ change to logLevel: 'info' ↑↑↑


  plugins: [reactRefresh()],
  server: {
    hmr: {
      clientPort: process.env.VITE_CLIENT_PORT || null
    },
    proxy: {
      '^/api': {
        target: 'http://api',
        changeOrigin: true
      }
    }
  }
})
