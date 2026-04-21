import type { CollectionEntry } from 'astro:content';
import siteConfig from '../../site.config.mjs';

export type BlogPost = CollectionEntry<'blog'>;

export interface GroupSummary {
  name: string;
  count: number;
  posts: BlogPost[];
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function getPostUrl(post: BlogPost) {
  return `/blog/${post.slug}.html`;
}

export function getCategoryUrl(category: string) {
  return `/blog/category/${encodeURIComponent(category)}.html`;
}

export function getTagUrl(tag: string) {
  return `/blog/tag/${encodeURIComponent(tag)}.html`;
}

export function getCategoriesUrl() {
  return '/blog/categories.html';
}

export function getTagsUrl() {
  return '/blog/tags.html';
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function getFeaturedPosts(posts: BlogPost[], limit = 3) {
  return posts.filter((post) => post.data.featured).slice(0, limit);
}

export function getRecentPosts(posts: BlogPost[], limit = 5) {
  return sortPosts(posts).slice(0, limit);
}

export function getAdjacentPosts(posts: BlogPost[], currentPost: BlogPost) {
  const orderedPosts = sortPosts(posts);
  const currentIndex = orderedPosts.findIndex((post) => post.id === currentPost.id);

  return {
    previousPost: currentIndex >= 0 ? orderedPosts[currentIndex + 1] ?? null : null,
    nextPost: currentIndex > 0 ? orderedPosts[currentIndex - 1] ?? null : null,
  };
}

export function getAllTags(posts: BlogPost[]) {
  return [...new Set(posts.flatMap((post) => post.data.tags))];
}

export function groupByCategory(posts: BlogPost[]) {
  return posts.reduce<Record<string, BlogPost[]>>((groups, post) => {
    groups[post.data.category] ??= [];
    groups[post.data.category].push(post);
    return groups;
  }, {});
}

export function groupByTag(posts: BlogPost[]) {
  return posts.reduce<Record<string, BlogPost[]>>((groups, post) => {
    post.data.tags.forEach((tag) => {
      groups[tag] ??= [];
      groups[tag].push(post);
    });
    return groups;
  }, {});
}

export function getCategorySummaries(posts: BlogPost[]): GroupSummary[] {
  return Object.entries(groupByCategory(posts))
    .map(([name, items]) => ({
      name,
      count: items.length,
      posts: sortPosts(items),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}

export function getTagSummaries(posts: BlogPost[]): GroupSummary[] {
  return Object.entries(groupByTag(posts))
    .map(([name, items]) => ({
      name,
      count: items.length,
      posts: sortPosts(items),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'));
}

export function getRelatedPosts(posts: BlogPost[], currentPost: BlogPost, limit = 3) {
  return posts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => ({
      post,
      score: getRelatedScore(currentPost, post),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.publishDate.valueOf() - a.post.data.publishDate.valueOf())
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, siteConfig.siteUrl).toString();
}

function getRelatedScore(currentPost: BlogPost, candidatePost: BlogPost) {
  let score = 0;

  if (currentPost.data.category === candidatePost.data.category) {
    score += 4;
  }

  const sharedTags = currentPost.data.tags.filter((tag) => candidatePost.data.tags.includes(tag)).length;
  score += sharedTags * 3;

  if (candidatePost.data.featured) {
    score += 1;
  }

  return score;
}
