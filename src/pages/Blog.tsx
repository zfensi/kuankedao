import { ArrowUpRight, Sparkles } from 'lucide-react'
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
  const featuredPost = posts.find((post) => post.featured) ?? posts[0] ?? null
  const remainingPosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : []

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[rgba(56,189,248,0.10)] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[rgba(14,165,233,0.08)] blur-3xl" />
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_320px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 px-3 py-1 text-xs text-[rgb(var(--muted))]">
              <Sparkles className="h-3.5 w-3.5 text-[rgb(var(--accent))]" />
              <span>{t('blogLead')}</span>
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-4xl">{t('blogTitle')}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[rgb(var(--muted))]">{t('blogDesc')}</p>
          </div>

          <Card className="bg-[rgb(var(--bg))]/80 p-5">
            <div className="text-xs text-[rgb(var(--muted))]">{t('blogFilterLabel')}</div>
            <div className="mt-3">
              <Select
                value={category}
                onChange={(event) => {
                  const nextCategory = event.target.value
                  const nextSp = new URLSearchParams(sp)
                  if (nextCategory) {
                    nextSp.set('category', nextCategory)
                  } else {
                    nextSp.delete('category')
                  }
                  setSp(nextSp, { replace: true })
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
            <div className="mt-4 text-xs leading-6 text-[rgb(var(--muted))]">{t('blogFilterDesc')}</div>
          </Card>
        </div>
      </section>

      {featuredPost && (
        <Link to={buildBlogArticlePath(locale, featuredPost.slug)}>
          <Card className="group overflow-hidden p-6 transition hover:border-[rgb(var(--accent))] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_220px] lg:items-end">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{t('blogFeatured')}</Badge>
                  {featuredPost.category && <Badge className="bg-transparent">{featuredPost.category}</Badge>}
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[rgb(var(--fg))] sm:text-3xl">{featuredPost.title}</h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">{featuredPost.description}</p>
              </div>

              <div className="flex flex-col gap-3 text-sm text-[rgb(var(--muted))]">
                <div>{new Date(featuredPost.publishDate).toLocaleDateString()}</div>
                <div>{featuredPost.readingTime}</div>
                <div className="inline-flex items-center gap-2 text-[rgb(var(--fg))]">
                  <span>{t('blogReadNow')}</span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </Card>
        </Link>
      )}

      {remainingPosts.length > 0 && (
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-sm font-medium tracking-tight text-[rgb(var(--fg))]">{t('blogLatest')}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {remainingPosts.map((post) => (
              <Link key={post.slug} to={buildBlogArticlePath(locale, post.slug)}>
                <Card className="flex h-full flex-col justify-between p-5 transition hover:border-[rgb(var(--accent))]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
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
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <Card className="p-6">
          <div className="text-sm font-medium text-[rgb(var(--fg))]">{t('blogEmptyTitle')}</div>
          <div className="mt-2 text-xs text-[rgb(var(--muted))]">{t('blogEmptyDesc')}</div>
        </Card>
      )}
    </div>
  )
}
