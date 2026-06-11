import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getBlogPost } from '@/blog/content'
import { MarkdownRenderer } from '@/blog/MarkdownRenderer'
import { buildBlogArticlePath, buildPagePath } from '@/i18n/routing'
import { useI18n } from '@/i18n/useI18n'
import { useManagedJsonLd, usePageSeoOverride } from '@/lib/seo'

export default function BlogArticle() {
  const { t, locale } = useI18n()
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : null
  const seoMeta = useMemo(() => {
    if (!post) {
      return null
    }

    return {
      title: `${post.title} - ${t('brandName')}`,
      description: post.description || post.content.slice(0, 160),
      url: new URL(buildBlogArticlePath(locale, post.slug), window.location.origin).toString(),
    }
  }, [locale, post, t])
  const articleSchema = useMemo(() => {
    if (!post) {
      return null
    }

    const pageUrl = new URL(buildBlogArticlePath(locale, post.slug), window.location.origin).toString()

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${pageUrl}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      inLanguage: locale === 'zh' ? 'zh-CN' : locale,
      articleSection: post.category,
      keywords: post.tags,
      url: pageUrl,
      mainEntityOfPage: pageUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Kuankedao',
        url: window.location.origin,
        logo: {
          '@type': 'ImageObject',
          url: new URL('/icon-512.svg', window.location.origin).toString(),
        },
      },
    }
  }, [locale, post])

  useManagedJsonLd('blog-article', articleSchema)
  usePageSeoOverride(seoMeta)

  if (!post) {
    return (
      <Card className="p-6">
        <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('blogEmptyTitle')}</div>
        <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('blogNotFoundDesc')}</div>
        <div className="mt-4">
          <Link to={buildPagePath(locale, 'blog')}>
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              {t('blogBack')}
            </Button>
          </Link>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link to={buildPagePath(locale, 'blog')} className="inline-flex items-center gap-2 text-xs text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">
          <ChevronLeft className="h-4 w-4" />
          {t('blogBack')}
        </Link>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {post.featured && <Badge>{t('blogFeatured')}</Badge>}
            {post.category && <Badge className="bg-transparent">{post.category}</Badge>}
            <span className="text-xs text-[rgb(var(--muted))]">{new Date(post.publishDate).toLocaleDateString()}</span>
            {post.readingTime && <span className="text-xs text-[rgb(var(--muted))]">{post.readingTime}</span>}
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[rgb(var(--fg))]">{post.title}</h1>
            {post.description && <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted))]">{post.description}</p>}
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-transparent">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-2 border-t border-[rgb(var(--border))] pt-6">
            <MarkdownRenderer content={post.content} />
          </div>
        </div>
      </Card>
    </div>
  )
}
