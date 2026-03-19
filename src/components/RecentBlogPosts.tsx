import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { CategoryLabels } from "@/types/blogPost";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    mainImage: string;
    publishedAt: string;
    categories?: string[];
}

async function getRecentPosts(): Promise<BlogPost[]> {
    const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt,
    categories
  }`;

    const posts = await client.fetch(query);
    return posts;
}

export default async function RecentBlogPosts() {
    const posts = await getRecentPosts();

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto max-w-6xl px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">Blog & Νέα</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Τελευταίες Αναρτήσεις</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Διάβασε τα νέα μας, συμβουλές φροντίδας και ιστορίες διάσωσης</p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {posts.map((post) => (
                        <Link key={post._id} href={`/blog/${post.slug}`}>
                            <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all h-full flex flex-col">
                                {/* Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                    <Image src={post.mainImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    {/* Categories */}
                                    {post.categories && post.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories.slice(0, 2).map((category) => (
                                                <span key={category} className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">
                                                    {CategoryLabels[category] || category}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">{post.title}</h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
                                        <Calendar size={16} />
                                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-pink-600 px-8 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50">
                        Δες όλες τις αναρτήσεις
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
