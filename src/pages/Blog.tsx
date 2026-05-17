import { Link, useSearchParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Select } from '@/components/ui/Select'
import { listBlogCategories, listBlogPosts } from '@/blog/content'
import { useI18n } from '@/i18n/useI18n'
import { buildBlogArticlePath } from '@/i18n/routing'

export default function Blog() {
  const { t, locale } = useI18n()
  const [sp, setSp] = useSearchParams()

  const category = sp.get('category') ?? ''
  const categories = listBlogCategories()
  const posts = listBlogPosts().filter((post) => !category || post.category === category)

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[rgb(var(--fg))]">{t('blogTitle')}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[rgb(var(--muted))]">
            {t('blogDesc')} {posts.length ? `(${posts.length})` : ''}
          </p>
        </div>
        <div className="w-full sm:max-w-xs">
          <Select
            value={category}
            onChange={(event) => {
              const nextCategory = event.target.value
              if (nextCategory) {
                sp.set('category', nextCategory)
              } else {
                sp.delete('category')
              }
              setSp(sp, { replace: true })
            }}
          >
            <option value="">{t('blogCategoryAll')}</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} to={buildBlogArticlePath(locale, post.slug)}>
            <Card className="flex h-full flex-col justify-between p-5 transition hover:border-[rgb(var(--accent))]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {post.featured && <Badge>{t('blogFeatured')}</Badge>}
                  {post.category && <Badge className="bg-transparent">{post.category}</Badge>}
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">{post.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted))]">{post.description}</p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-[rgb(var(--muted))]">
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                <span>{post.readingTime}</span>
              </div>
            </Card>
          </Link>
        ))}

        {posts.length === 0 && (
          <Card className="p-6 md:col-span-2">
            <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('blogEmptyTitle')}</div>
            <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('blogEmptyDesc')}</div>
          </Card>
        )}
      </div>
    </div>
  )
}
