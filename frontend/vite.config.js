// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // keep if you're using it

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173, // optional - your preferred port
    strictPort: false, // optional - fall back if port taken
    open: true, // optional - auto open browser

    // THIS IS THE IMPORTANT PART: proxy /api to backend
    proxy: {
      "/api": {
        target: "http://localhost:5000", // your Node/Express backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // keep /api prefix
      },
    },

    // Optional: better HMR in some cases
    hmr: {
      clientPort: 5173,
    },
  },
});
