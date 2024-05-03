import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import {global} from "./src/inc/global";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: global.appName,
  },
  server: {
    host:'127.0.0.1',
    port: 1234,
  },
})
