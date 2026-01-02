"use client";

import { formatDate } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostContentProps {
    content: string;
    title: string;
    author: string;
    publishedAt: string;
    lang: string;
}

export default function BlogPostContent({
    content,
    title,
    author,
    publishedAt,
    lang,
}: BlogPostContentProps) {
    return (
        <article className="prose prose-invert prose-lg max-w-none">
            {/* Header */}
            <header className="not-prose mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{author}</span>
                    <span>•</span>
                    <time dateTime={publishedAt}>
                        {formatDate(publishedAt, lang)}
                    </time>
                </div>
            </header>

            {/* Content */}
            <div className="prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-img:rounded-xl prose-img:shadow-lg">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content.replace(/\\n/g, '\n')}
                </ReactMarkdown>
            </div>
        </article>
    );
}
