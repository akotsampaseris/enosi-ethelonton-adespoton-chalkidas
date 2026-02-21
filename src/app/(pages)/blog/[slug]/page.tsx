import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    mainImage: string;
    publishedAt: string;
    author?: {
        name: string;
        image?: string;
    };
    categories?: string[];
    body: any;
}

async function getPost(slug: string): Promise<BlogPost | null> {
    const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt,
    "author": author->{name, "image": image.asset->url},
    categories,
    body
  }`;

    const post = await client.fetch(query, { slug });
    return post;
}

async function getRelatedPosts(
    currentSlug: string,
    categories?: string[],
): Promise<BlogPost[]> {
    if (!categories || categories.length === 0) {
        const query = `*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage.asset->url,
      publishedAt,
      categories
    }`;
        return client.fetch(query, { currentSlug });
    }

    const query = `*[_type == "post" && slug.current != $currentSlug && count((categories[])[@ in $categories]) > 0] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt,
    categories
  }`;

    return client.fetch(query, { currentSlug, categories });
}

export async function generateStaticParams() {
    const query = `*[_type == "post"] {
    "slug": slug.current
  }`;

    const posts = await client.fetch(query);
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

const categoryLabels: Record<string, string> = {
    "adoption-stories": "Ιστορίες Υιοθεσίας",
    "animal-care": "Φροντίδα Ζώων",
    events: "Εκδηλώσεις",
    news: "Νέα",
    "tips-advice": "Συμβουλές",
    "volunteer-stories": "Ιστορίες Εθελοντών",
};

// Portable Text components for rich content rendering
const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image
                    src={value.asset.url}
                    alt={value.alt || "Blog image"}
                    width={1200}
                    height={800}
                    className="rounded-2xl"
                />
                {value.caption && (
                    <p className="text-sm text-gray-500 text-center mt-2 italic">
                        {value.caption}
                    </p>
                )}
            </div>
        ),
    },
    block: {
        h2: ({ children }: any) => (
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">
                {children}
            </h3>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-pink-500 pl-6 py-2 my-6 italic text-gray-700 bg-pink-50 rounded-r-lg">
                {children}
            </blockquote>
        ),
        normal: ({ children }: any) => (
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {children}
            </p>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a
                href={value.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 underline"
            >
                {children}
            </a>
        ),
        strong: ({ children }: any) => (
            <strong className="font-bold text-gray-900">{children}</strong>
        ),
        em: ({ children }: any) => <em className="italic">{children}</em>,
    },
};

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, post.categories);

    return (
        <PageLayout>
            <div className="min-h-screen bg-white">
                {/* Back Button */}
                <div className="container mx-auto max-w-4xl px-4 py-8">
                    <Button variant="ghost" asChild>
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft size={20} />
                            Πίσω στο Blog
                        </Link>
                    </Button>
                </div>

                {/* Article Header */}
                <article className="container mx-auto max-w-4xl px-4 pb-20">
                    {/* Categories */}
                    {post.categories && post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold"
                                >
                                    {categoryLabels[cat] || cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Calendar size={20} />
                            <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        {post.author && (
                            <div className="flex items-center gap-3">
                                {post.author.image ? (
                                    <Image
                                        src={post.author.image}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                        <User
                                            className="text-pink-600"
                                            size={20}
                                        />
                                    </div>
                                )}
                                <span className="font-medium">
                                    {post.author.name}
                                </span>
                            </div>
                        )}
                        <button className="ml-auto flex items-center gap-2 text-pink-600 hover:text-pink-700">
                            <Share2 size={20} />
                            <span className="hidden sm:inline">
                                Κοινοποίηση
                            </span>
                        </button>
                    </div>

                    {/* Featured Image */}
                    <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
                        <Image
                            src={post.mainImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                        {post.excerpt}
                    </div>

                    {/* Body Content */}
                    <div className="prose prose-lg max-w-none">
                        <PortableText
                            value={post.body}
                            components={portableTextComponents}
                        />
                    </div>

                    {/* Share Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Σας άρεσε αυτό το άρθρο;
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Κοινοποιήστε το με φίλους που ενδιαφέρονται για
                                την προστασία των ζώων
                            </p>
                            <Button className="bg-pink-500 hover:bg-pink-600">
                                <Share2 className="mr-2" size={18} />
                                Κοινοποίηση
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="bg-gray-50 py-20">
                        <div className="container mx-auto max-w-6xl px-4">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Σχετικά Άρθρα
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost._id}
                                        href={`/blog/${relatedPost.slug}`}
                                    >
                                        <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                                <Image
                                                    src={relatedPost.mainImage}
                                                    alt={relatedPost.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">
                                                    {relatedPost.excerpt}
                                                </p>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </PageLayout>
    );
}

export const revalidate = 3600;
