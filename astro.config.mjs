import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
    site: 'https://celiachavezv.github.io',
    base: '/CelestiaCom',
    trailingSlash: 'always',
    integrations: [astroImageTools],
});