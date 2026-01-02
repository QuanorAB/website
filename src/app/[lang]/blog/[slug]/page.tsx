import BlogPostContent from "@/components/BlogPostContent";
import { Button } from "@/components/ui/button";
import { languages } from "@/i18n/settings";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const slugs = await getAllPostSlugs();
    const params: { lang: string; slug: string }[] = [];

    for (const lang of languages) {
        for (const slug of slugs) {
            params.push({ lang, slug });
        }
    }

    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
    const { lang, slug } = await params;
    const post = await getPostBySlug(slug, lang);
    const baseUrl = "https://www.quanor.com";

    if (!post) {
        return {
            title: lang === 'sv' ? 'Inlägg hittas inte | Quanor' : 'Post Not Found | Quanor',
        };
    }

    return {
        title: `${post.title} | Quanor`,
        description: post.excerpt,
        authors: [{ name: post.author }],
        alternates: {
            canonical: `${baseUrl}/${lang}/blog/${slug}`,
            languages: {
                'sv': `${baseUrl}/sv/blog/${slug}`,
                'en': `${baseUrl}/en/blog/${slug}`,
                'x-default': `${baseUrl}/sv/blog/${slug}`,
            },
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${baseUrl}/${lang}/blog/${slug}`,
            type: 'article',
            publishedTime: post.published_at,
            authors: [post.author],
            images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630, alt: post.title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.cover_image ? [post.cover_image] : [],
        },
    };
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
    const { lang, slug } = await params;
    const post = await getPostBySlug(slug, lang);

    if (!post) {
        notFound();
    }

    const backText = lang === 'sv' ? 'Tillbaka till bloggen' : 'Back to blog';

    // JSON-LD Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
            "@type": "Person",
            "name": post.author,
        },
        "publisher": {
            "@type": "Organization",
            "name": "Quanor AB",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.quanor.com/logo.png",
            },
        },
        "datePublished": post.published_at,
        "image": post.cover_image || "https://www.quanor.com/images/og-image.png",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.quanor.com/${lang}/blog/${slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />

            <div className="min-h-screen bg-background pt-24 pb-16">
                <div className="container mx-auto px-6">
                    {/* Back button */}
                    <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                        <Link href={`/${lang}/blog`}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            {backText}
                        </Link>
                    </Button>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-12">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="max-w-3xl mx-auto">
                        <BlogPostContent
                            content={post.content}
                            title={post.title}
                            author={post.author}
                            publishedAt={post.published_at}
                            lang={lang}
                        />
                    </div>

                    {/* Back to blog */}
                    <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
                        <Link
                            href={`/${lang}/blog`}
                            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {backText}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
