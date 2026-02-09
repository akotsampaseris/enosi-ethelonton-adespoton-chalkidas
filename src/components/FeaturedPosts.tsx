"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt?: string;
    readTime?: number;
    mainImage?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
}

interface FeaturedPostsProps {
    posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="px-6 py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                        Latest Writing
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Recent explorations in physics, programming, and
                        everything in between
                    </p>
                </div>

                <motion.div
                    className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {posts.map((post) => (
                        <motion.article
                            key={post._id}
                            variants={item}
                            className="group relative isolate flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-800/50 shadow-lg ring-1 ring-zinc-900/5 dark:ring-zinc-50/5 transition hover:shadow-xl"
                        >
                            <Link
                                href={`/blog/${post.slug.current}`}
                                className="absolute inset-0 z-10"
                            >
                                <span className="sr-only">
                                    Read {post.title}
                                </span>
                            </Link>

                            {post.mainImage?.asset?.url && (
                                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                                    <Image
                                        src={post.mainImage.asset.url}
                                        alt={post.mainImage.alt || post.title}
                                        fill
                                        className="object-cover transition duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex items-center gap-x-4 text-xs text-zinc-600 dark:text-zinc-400">
                                    <time
                                        dateTime={post.publishedAt}
                                        className="flex items-center gap-1"
                                    >
                                        <Calendar className="h-3.5 w-3.5" />
                                        {formatDate(post.publishedAt)}
                                    </time>
                                    {post.readTime && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {post.readTime} min read
                                        </span>
                                    )}
                                </div>

                                <div className="group relative flex-1">
                                    <h3 className="mt-3 text-xl font-semibold leading-6 text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Read article
                                    <span
                                        aria-hidden="true"
                                        className="transition-transform group-hover:translate-x-1"
                                    >
                                        →
                                    </span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 dark:border-zinc-50/10 px-6 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50 transition hover:bg-zinc-900/5 dark:hover:bg-zinc-50/5"
                    >
                        View all posts
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
