import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@clients": path.resolve(__dirname, "./src/clients"),
    },
  },
});
