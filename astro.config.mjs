import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
    site: 'https://webpage-emergency-ground-station-network',
    integrations: [astroImageTools],
});