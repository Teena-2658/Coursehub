import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";  // Import Tailwind CSS plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],  // Use the imported tailwindcss()
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Alias for src folder
    },
  },
});
