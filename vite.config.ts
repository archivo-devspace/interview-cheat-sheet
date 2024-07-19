import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const APP_BASE_URL = "/interview-cheat-sheet/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Interview Cheat Sheet",
        short_name: "Interview CS",
        description: "This is intended for interview.",
        theme_color: "#ffffff",
        icons: [
          {
            src: APP_BASE_URL + "/icons/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: APP_BASE_URL + "/icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: APP_BASE_URL + "/icons/512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  base: APP_BASE_URL,
});
