import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        commonjs(),
        externalGlobals({
          vue: 'Vue',
          'vue-router': 'VueRouter',
        }),
      ],
      output: {
        format: 'es',
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
        },
      },
    }
  }
});
