import { languages } from '@/i18n/settings'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.quanor.com'

    // Main pages with higher priority
    const mainRoutes = ['', '/features', '/pricing', '/about', '/contact']

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
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : 0.8,
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

    return sitemapEntries
}

