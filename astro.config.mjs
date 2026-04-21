import { defineConfig } from 'astro/config';
import siteConfig from './site.config.mjs';

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'static',
  vite: {
    server: {
      fs: {
        allow: ['.'],
      },
    },
  },
});
