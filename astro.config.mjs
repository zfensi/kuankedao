import { defineConfig } from 'astro/config';
import siteConfig from './site.config.mjs';

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'static',
  redirects: {
    '/tag': {
      status: 301,
      destination: '/blog/tags.html',
    },
    '/hong-mu': {
      status: 301,
      destination: '/blog/category/ins.html',
    },
    '/blogdetail': {
      status: 301,
      destination: '/blog/categories.html',
    },
  },
  build: {
    format: 'file',
  },
  vite: {
    server: {
      fs: {
        allow: ['.'],
      },
    },
  },
});
