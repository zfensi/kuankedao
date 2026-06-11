import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'
import Resources from '@/pages/Resources'
import ResourceDetail from '@/pages/ResourceDetail'
import Partners from '@/pages/Partners'
import Community from '@/pages/Community'
import Article from '@/pages/Article'
import Blog from '@/pages/Blog'
import BlogArticle from '@/pages/BlogArticle'
import About from '@/pages/About'
import Price from '@/pages/Price'
import LinkBuildingServices from '@/pages/LinkBuildingServices'
import TrustPage from '@/pages/TrustPage'
import { localeOptions } from '@/i18n/routing'

const pageRoutes = [
  { path: 'index.html', element: <Home /> },
  { path: 'resources.html', element: <Resources /> },
  { path: 'resources/:slug.html', element: <ResourceDetail /> },
  { path: 'partners.html', element: <Partners /> },
  { path: 'community.html', element: <Community /> },
  { path: 'community/:slug.html', element: <Article /> },
  { path: 'blog.html', element: <Blog /> },
  { path: 'price.html', element: <Price /> },
  { path: 'link-building-services.html', element: <LinkBuildingServices /> },
  { path: 'blog/:slug.html', element: <BlogArticle /> },
  { path: 'about.html', element: <About /> },
  { path: 'terms.html', element: <TrustPage pageId="terms" /> },
  { path: 'privacy.html', element: <TrustPage pageId="privacy" /> },
  { path: 'Our-Process-Refund.html', element: <TrustPage pageId="refund" /> },
  { path: 'contact.html', element: <TrustPage pageId="contact" /> },
  { path: 'support.html', element: <TrustPage pageId="support" /> },
]

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/index.html" replace />} />

        <Route element={<Layout />}>
          {pageRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {localeOptions
          .filter((option) => option.value !== 'zh')
          .map((option) => (
            <Route key={option.value} path={option.value} element={<Layout />}>
              {pageRoutes.map((route) => (
                <Route key={`${option.value}-${route.path}`} path={route.path} element={route.element} />
              ))}
            </Route>
          ))}

        <Route path="*" element={<Navigate to="/index.html" replace />} />
      </Routes>
    </Router>
  )
}
