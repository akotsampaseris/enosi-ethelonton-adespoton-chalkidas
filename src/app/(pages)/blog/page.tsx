import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { BlogPost } from "@/types/blogPost";

const POSTS_PER_PAGE = 9;

async function getPosts(page: number = 1): Promise<{
  featured: BlogPost | null;
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
}> {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const query = `{
    "featured": *[_type == "post" && featured == true] | order(publishedAt desc)[0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage.asset->url,
      publishedAt,
      "author": author->{name, "image": image.asset->url},
      categories,
      featured
    },
    "posts": *[_type == "post"] | order(publishedAt desc)[${start}...${end}] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage.asset->url,
      publishedAt,
      "author": author->{name, "image": image.asset->url},
      categories,
      featured
    },
    "totalPosts": count(*[_type == "post"])
  }`;

  const data = await client.fetch(query);

  return {
    ...data,
    totalPages: Math.ceil(data.totalPosts / POSTS_PER_PAGE),
    currentPage: page,
  };
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = Number(pageParam) || 1;

  const { featured, posts, totalPages } = await getPosts(currentPage);
  const regularPosts = posts.filter(
    (post) => !post.featured || post._id !== featured?._id,
  );

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Το Blog μας</h1>
            <p className="text-xl text-pink-100">
              Ιστορίες, συμβουλές και νέα από τον κόσμο της προστασίας των ζώων
            </p>
          </div>
        </section>

        {/* Featured Post - only on first page */}
        {currentPage === 1 && featured && (
          <section className="container mx-auto max-w-6xl px-4 py-16">
            <Link href={`/blog/${featured.slug}`}>
              <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] lg:aspect-auto">
                    <Image
                      src={featured.mainImage}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Προτεινόμενο
                      </span>
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {featured.categories && featured.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featured.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat}
                            className="text-sm text-pink-600 font-medium"
                          >
                            {categoryLabels[cat] || cat}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-pink-600 transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {featured.excerpt}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{formatDate(featured.publishedAt)}</span>
                      </div>
                      {featured.author && (
                        <div className="flex items-center gap-2">
                          <User size={18} />
                          <span>{featured.author.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-pink-600 font-semibold group-hover:gap-4 transition-all">
                      Διαβάστε περισσότερα
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Blog Grid */}
        <section className="container mx-auto max-w-6xl px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-3">
                        <span className="text-sm text-pink-600 font-medium">
                          {categoryLabels[post.categories[0]] ||
                            post.categories[0]}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-2">
                          <User size={16} />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {regularPosts.length === 0 && !featured && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Δεν υπάρχουν άρθρα ακόμα. Ελέγξτε ξανά σύντομα!
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="container mx-auto max-w-6xl px-4 pb-20">
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                asChild={currentPage > 1}
                className="border-gray-300"
              >
                {currentPage > 1 ? (
                  <Link href={`/blog?page=${currentPage - 1}`}>
                    <ChevronLeft size={20} />
                    Προηγούμενη
                  </Link>
                ) : (
                  <>
                    <ChevronLeft size={20} />
                    Προηγούμενη
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      className={
                        currentPage === pageNum
                          ? "bg-pink-500 hover:bg-pink-600"
                          : "border-gray-300"
                      }
                      asChild
                    >
                      <Link href={`/blog?page=${pageNum}`}>{pageNum}</Link>
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                asChild={currentPage < totalPages}
                className="border-gray-300"
              >
                {currentPage < totalPages ? (
                  <Link href={`/blog?page=${currentPage + 1}`}>
                    Επόμενη
                    <ChevronRight size={20} />
                  </Link>
                ) : (
                  <>
                    Επόμενη
                    <ChevronRight size={20} />
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Σελίδα {currentPage} από {totalPages}
            </p>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
