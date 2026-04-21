import type { APIRoute } from 'astro';
import siteConfig from '../../site.config.mjs';

export const GET: APIRoute = () => {
  const body = [
    `User-agent: *`,
    `Allow: /`,
    `Host: www.kuankedao.com`,
    `Sitemap: ${siteConfig.siteUrl}/sitemap.xml`,
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
