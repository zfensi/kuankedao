import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../../site.config.mjs';
import { getPostUrl, sortPosts, toAbsoluteUrl } from '../lib/blog';

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection('blog'));

  const items = posts
    .map(
      (post) => `<item>
  <title><![CDATA[${post.data.title}]]></title>
  <link>${toAbsoluteUrl(getPostUrl(post))}</link>
  <guid>${toAbsoluteUrl(getPostUrl(post))}</guid>
  <description><![CDATA[${post.data.description}]]></description>
  <pubDate>${post.data.publishDate.toUTCString()}</pubDate>
</item>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title><![CDATA[${siteConfig.siteName}]]></title>
  <link>${siteConfig.siteUrl}</link>
  <description><![CDATA[${siteConfig.description}]]></description>
  <language>zh-cn</language>
  <atom:link href="${siteConfig.siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
