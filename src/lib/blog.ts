import { supabase } from './supabase'

export interface BlogPost {
    id: string
    slug: string
    title_sv: string
    title_en: string
    excerpt_sv: string
    excerpt_en: string
    content_sv: string
    content_en: string
    cover_image: string | null
    author: string
    published_at: string
    created_at: string
    updated_at: string
    is_published: boolean
}

export interface BlogPostLocalized {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    cover_image: string | null
    author: string
    published_at: string
}

/**
 * Get all published blog posts
 */
export async function getAllPosts(lang: string): Promise<BlogPostLocalized[]> {
    if (!supabase) {
        console.warn('Supabase not configured')
        return []
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })

    if (error) {
        console.error('Error fetching blog posts:', error)
        return []
    }

    return (data || []).map((post: BlogPost) => localizePost(post, lang))
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string, lang: string): Promise<BlogPostLocalized | null> {
    if (!supabase) {
        console.warn('Supabase not configured')
        return null
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .lte('published_at', new Date().toISOString())
        .single()

    if (error || !data) {
        return null
    }

    return localizePost(data as BlogPost, lang)
}

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs(): Promise<string[]> {
    if (!supabase) {
        return []
    }

    const { data, error } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('is_published', true)
        .lte('published_at', new Date().toISOString())

    if (error || !data) {
        return []
    }

    return data.map((post: { slug: string }) => post.slug)
}

/**
 * Helper to localize a post based on language
 */
function localizePost(post: BlogPost, lang: string): BlogPostLocalized {
    return {
        id: post.id,
        slug: post.slug,
        title: lang === 'sv' ? post.title_sv : post.title_en,
        excerpt: lang === 'sv' ? post.excerpt_sv : post.excerpt_en,
        content: lang === 'sv' ? post.content_sv : post.content_en,
        cover_image: post.cover_image,
        author: post.author,
        published_at: post.published_at,
    }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, lang: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'sv' ? 'sv-SE' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
