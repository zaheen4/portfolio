import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://zaheen4.github.io",
  base: "/portfolio",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
