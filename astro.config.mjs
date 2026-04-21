import { defineConfig } from 'astro/config';
import siteConfig from './site.config.mjs';

export default defineConfig({
  site: siteConfig.siteUrl,
  output: 'static',
  redirects: {
    '/tag': '/blog/tags.html',
    '/tag/[...slug]': '/blog/tags.html',
    '/hong-mu': '/blog/category/ins.html',
    '/hong-mu/[...slug]': '/blog/category/ins.html',
    '/blogdetail': '/blog/categories.html',
    '/blogdetail/[...slug]': '/blog/categories.html',
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
