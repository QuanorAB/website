import { languages } from '@/i18n/settings'
import { getAllPostsForSitemap } from '@/lib/blog'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.quanor.com'
    const buildDate = new Date()

    // Main pages with higher priority
    const mainRoutes = ['', '/features', '/pricing', '/about', '/contact', '/blog']

    // Legal pages with lower priority
    const legalRoutes = ['/privacy', '/terms', '/cookies']

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Add main pages
    mainRoutes.forEach((route) => {
        languages.forEach((lang) => {
            const alternates: Record<string, string> = {}
            languages.forEach((l) => {
                alternates[l] = `${baseUrl}/${l}${route}`
            })
            // x-default points to Swedish version
            alternates['x-default'] = `${baseUrl}/sv${route}`

            sitemapEntries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: buildDate,
                changeFrequency: route === '' ? 'daily' : route === '/blog' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
                alternates: {
                    languages: alternates
                }
            })
        })
    })

    // Add legal pages
    legalRoutes.forEach((route) => {
        languages.forEach((lang) => {
            const alternates: Record<string, string> = {}
            languages.forEach((l) => {
                alternates[l] = `${baseUrl}/${l}${route}`
            })
            alternates['x-default'] = `${baseUrl}/sv${route}`

            sitemapEntries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: buildDate,
                changeFrequency: 'monthly',
                priority: 0.3,
                alternates: {
                    languages: alternates
                }
            })
        })
    })

    // Add blog posts with actual updated_at dates from Supabase
    try {
        const posts = await getAllPostsForSitemap()
        posts.forEach((post) => {
            languages.forEach((lang) => {
                const alternates: Record<string, string> = {}
                languages.forEach((l) => {
                    alternates[l] = `${baseUrl}/${l}/blog/${post.slug}`
                })
                alternates['x-default'] = `${baseUrl}/sv/blog/${post.slug}`

                sitemapEntries.push({
                    url: `${baseUrl}/${lang}/blog/${post.slug}`,
                    // Use actual updated_at from Supabase, fallback to build date
                    lastModified: post.updated_at ? new Date(post.updated_at) : buildDate,
                    changeFrequency: 'monthly',
                    priority: 0.7,
                    alternates: {
                        languages: alternates
                    }
                })
            })
        })
    } catch (error) {
        console.error('Error fetching blog posts for sitemap:', error)
    }

    return sitemapEntries
}
