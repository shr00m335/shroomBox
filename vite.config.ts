import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/gmail_api": {
        target: "https://localhost:8080",
        changeOrigin: true,
        secure: false, // Ignores SSL issues
        rewrite: (path) => path.replace(/^\/gmail_api/, ""),
      },
    },
  },
});
