import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../../site.config.mjs';
import { getCategorySummaries, getCategoryUrl, getTagSummaries, getTagUrl, sortPosts } from '../lib/blog';

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection('blog'));
  const categories = getCategorySummaries(posts);
  const tags = getTagSummaries(posts);
  const urls = [
    '/',
    '/blog/',
    '/blog/categories/',
    '/blog/tags/',
    '/search/',
    '/about/',
    '/rss.xml',
    ...posts.map((post) => `/blog/${post.slug}/`),
    ...categories.map((category) => getCategoryUrl(category.name)),
    ...tags.map((tag) => getTagUrl(tag.name)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((url) => `  <url><loc>${new URL(url, siteConfig.siteUrl).toString()}</loc></url>`)
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
