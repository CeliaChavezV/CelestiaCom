import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools";

export default defineConfig({
  site: 'https://celiachavezv.github.io',
  base: '/CelestiaCom',
  trailingSlash: 'always',
  integrations: [astroImageTools],
  vite: {
    ssr: {
      noExternal: ['firebase']
    },
    define: {
      'import.meta.env.PUBLIC_FIREBASE_API_KEY': JSON.stringify(process.env.PUBLIC_FIREBASE_API_KEY),
      'import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.PUBLIC_FIREBASE_AUTH_DOMAIN),
      'import.meta.env.PUBLIC_FIREBASE_PROJECT_ID': JSON.stringify(process.env.PUBLIC_FIREBASE_PROJECT_ID),
      'import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.PUBLIC_FIREBASE_STORAGE_BUCKET),
      'import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
      'import.meta.env.PUBLIC_FIREBASE_APP_ID': JSON.stringify(process.env.PUBLIC_FIREBASE_APP_ID)
    }
  }
});