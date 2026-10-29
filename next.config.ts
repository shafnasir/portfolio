import type { NextConfig } from "next";

// Set by GitHub Actions (actions/configure-pages). Empty for local dev and for a user site.
const basePath = process.env.PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // GitHub Pages serves the static files in /out. There is no Node server.
  output: "export",
  ...(basePath ? { basePath } : {}),
  // Static export cannot mix Cache Components with the Open Graph image route.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
