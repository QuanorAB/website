"use client";

import { BlogPostLocalized, formatDate } from "@/lib/blog";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    post: BlogPostLocalized;
    lang: string;
    index?: number;
}

export default function BlogCard({ post, lang, index = 0 }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <Link href={`/${lang}/blog/${post.slug}`}>
                <div className="bg-card/50 border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                    {/* Cover Image */}
                    {post.cover_image && (
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.published_at}>
                                {formatDate(post.published_at, lang)}
                            </time>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-muted-foreground line-clamp-3">
                            {post.excerpt}
                        </p>

                        {/* Read more */}
                        <div className="flex items-center gap-2 text-primary font-medium pt-2">
                            <span>{lang === 'sv' ? 'Läs mer' : 'Read more'}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
