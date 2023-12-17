import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import ViteReact from '@vitejs/plugin-react';
import { createProxy } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteReact(), createProxy('/api', { target: 'https://serverapi.jhonnatasribeir.repl.co' })],

  
})

