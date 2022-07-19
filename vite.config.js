import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";
import vue from "@vitejs/plugin-vue";
import fs  from "fs";


var rollupMapFile = './map/default.json';

if(process.env.MAP_FILE) {
  var filename = './map/' + process.env.MAP_FILE + '.json';
  if(fs.existsSync(filename)) {
    rollupMapFile = filename
  }
}

var mapSettings = JSON.parse(fs.readFileSync(rollupMapFile, 'utf-8'));
mapSettings.alias["@"] = fileURLToPath(new URL("./src", import.meta.url))


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: mapSettings.alias,
  },
  build: {
    "outDir": mapSettings.outDir,
    rollupOptions: {
      plugins: [
        commonjs(),
        externalGlobals({
          vue: "Vue",
          "vue-router": "VueRouter",
        }),
      ],
      output: {
        format: "es",
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
        },
      },
    },
  },
});
