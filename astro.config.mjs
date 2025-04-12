import { defineConfig } from 'astro/config';

export default defineConfig({
    site: 'https://celiachavezv.github.io/CelestiaCom/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
