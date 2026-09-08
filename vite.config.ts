import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const tmdbToken =
    env.VITE_TMDB_ACCESS_TOKEN ||
    env.TMDB_ACCESS_TOKEN ||
    process.env.VITE_TMDB_ACCESS_TOKEN ||
    process.env.TMDB_ACCESS_TOKEN ||
    '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_TMDB_ACCESS_TOKEN': JSON.stringify(tmdbToken),
    },
  };
});

