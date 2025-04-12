import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
    base: '/CelestiaCom/',
    trailingSlash: 'always',
    output: 'static',
    build: {
      format: 'directory'
    }
  });