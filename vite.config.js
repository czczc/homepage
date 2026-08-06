import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base './' keeps asset URLs relative, so the site works at any mount point
// (czczc.github.io root, a /homepage/ project page, or phy.bnl.gov subdirectory).
export default defineConfig({
  base: './',
  plugins: [vue()],
})
