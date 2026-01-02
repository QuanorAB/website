import { languages } from '@/i18n/settings'
import { getAllPostSlugs } from '@/lib/blog'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.quanor.com'

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
                lastModified: new Date(),
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
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.3,
                alternates: {
                    languages: alternates
                }
            })
        })
    })

    // Add blog posts
    try {
        const slugs = await getAllPostSlugs()
        slugs.forEach((slug) => {
            languages.forEach((lang) => {
                const alternates: Record<string, string> = {}
                languages.forEach((l) => {
                    alternates[l] = `${baseUrl}/${l}/blog/${slug}`
                })
                alternates['x-default'] = `${baseUrl}/sv/blog/${slug}`

                sitemapEntries.push({
                    url: `${baseUrl}/${lang}/blog/${slug}`,
                    lastModified: new Date(),
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
