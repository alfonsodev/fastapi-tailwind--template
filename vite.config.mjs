import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "app/js/src"),
      },
    },
    // All paths are relative to this vite.config.js file (workspace root)
    build: {
      root: resolve(__dirname, "app"),
      outDir: resolve(__dirname, "app/dist"),
      emptyOutDir: true, // Clears app/static/js before each build
      minify: isProduction,
      sourcemap: !isProduction ? "inline" : true, // Inline sourcemaps for dev, separate for prod
      rollupOptions: {
        input: {
          // Entry point: app/js/src/main.js
          // The output file will be app/static/js/main.js
          main: resolve(__dirname, "app/js/main.js"),
          // If you have other independent JS files you want to bundle, add them here:
          // example: resolve(__dirname, 'app/js/example.js'),
        },
        output: {
          // Ensures the output filenames are predictable (e.g., main.js)
          entryFileNames: "js/[name].js",
          chunkFileNames: "js/[name].js", // For any code-split chunks
          assetFileNames: "css/[name].[ext]", // For any assets like CSS if imported via JS
        },
      },
    },
    // We are not using Vite's dev server, so no 'server' block is needed here.
    // Vite is only used as a bundler via 'vite build --watch'.
  };
});
