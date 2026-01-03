import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { languages } from "@/i18n/settings";
import { getAllPosts } from "@/lib/blog";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const baseUrl = "https://www.quanor.com";

    return {
        title: lang === 'sv' ? 'Blogg | Quanor' : 'Blog | Quanor',
        description: lang === 'sv'
            ? 'Läs de senaste nyheterna, insikterna och uppdateringarna från Quanor-teamet om AI-driven finansiell analys.'
            : 'Read the latest news, insights, and updates from the Quanor team about AI-driven financial analysis.',
        alternates: {
            canonical: `${baseUrl}/${lang}/blog`,
            languages: {
                'sv': `${baseUrl}/sv/blog`,
                'en': `${baseUrl}/en/blog`,
                'x-default': `${baseUrl}/sv/blog`,
            },
        },
        openGraph: {
            title: lang === 'sv' ? 'Blogg | Quanor' : 'Blog | Quanor',
            description: lang === 'sv'
                ? 'Läs de senaste nyheterna och insikterna från Quanor-teamet.'
                : 'Read the latest news and insights from the Quanor team.',
            url: `${baseUrl}/${lang}/blog`,
            type: 'website',
        },
    };
}

const content = {
    sv: {
        title: "Blogg",
        subtitle: "Nyheter, insikter och uppdateringar från Quanor-teamet",
        backToHome: "Tillbaka",
        noPosts: "Inga inlägg ännu",
        noPostsDescription: "Vi arbetar på att skapa innehåll. Kom tillbaka snart!",
    },
    en: {
        title: "Blog",
        subtitle: "News, insights, and updates from the Quanor team",
        backToHome: "Back",
        noPosts: "No posts yet",
        noPostsDescription: "We're working on creating content. Check back soon!",
    },
};

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const t = lang === "sv" ? content.sv : content.en;
    const posts = await getAllPosts(lang);

    return (
        <div className="min-h-screen bg-background pt-24 pb-16">
            <div className="container mx-auto px-6">
                {/* Back button */}
                <Button variant="ghost" asChild className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href={`/${lang}`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t.backToHome}
                    </Link>
                </Button>

                {/* Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        {t.title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        {t.subtitle}
                    </p>
                </header>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <BlogCard key={post.id} post={post} lang={lang} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                            {t.noPosts}
                        </h2>
                        <p className="text-muted-foreground">
                            {t.noPostsDescription}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
