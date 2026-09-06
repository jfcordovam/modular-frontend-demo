import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

export default defineConfig({
  // Support both the standalone deployment and the portfolio subpath.
  base: './',
  plugins: [react()],
  define: { __SHELL_VERSION__: JSON.stringify(pkg.version) },
})
