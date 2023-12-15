import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import eslint from "vite-plugin-eslint"
import importToCDN from "vite-plugin-cdn-import"
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    eslint(),
    importToCDN({
      modules: [{ name: "algosdk", var: "algosdk", path: "dist/browser/algosdk.min.js" }],
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
})
