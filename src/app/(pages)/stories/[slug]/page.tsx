import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Calendar, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/ui/PageLayout";
import { SuccessStory } from "@/types/successStory";
import ShareButton from "@/components/ShareButton";
import { formatDate } from "@/lib/utils";
import { portableTextComponents } from "@/types/portableText";
import { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const story = await getStory(slug);

    if (!story) return {};

    return {
        ...defaultMetadata,
        title: `${story.animalName}`,
        description: story.excerpt,
        openGraph: {
            ...defaultMetadata.openGraph,
            url: `https://eeach.gr/stories/${slug}`,
            title: `${story.animalName}`,
            description: story.excerpt,
            images: [
                {
                    url: story.mainImage,
                    width: 1200,
                    height: 630,
                    alt: story.animalName,
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: `${story.animalName} - Διαθέσιμο για Υιοθεσία`,
            description: story.excerpt,
            images: [
                {
                    url: story.mainImage,
                    width: 1200,
                    height: 630,
                    alt: story.animalName,
                },
            ],
        },
    };
}

async function getStory(slug: string): Promise<SuccessStory | null> {
    const query = `*[_type == "successStory" && slug.current == $slug][0] {
    _id,
    title,
    animalName,
    "slug": slug.current,
    adopterName,
    adoptionDate,
    "mainImage": mainImage.asset->url,
    "beforeImage": beforeImage.asset->url,
    excerpt,
    story
  }`;

    const story = await client.fetch(query, { slug });
    return story;
}

async function getRelatedStories(currentSlug: string): Promise<SuccessStory[]> {
    const query = `*[_type == "successStory" && slug.current != $currentSlug] | order(adoptionDate desc)[0...3] {
    _id,
    title,
    animalName,
    "slug": slug.current,
    adopterName,
    adoptionDate,
    "mainImage": mainImage.asset->url,
    excerpt
  }`;

    return client.fetch(query, { currentSlug });
}

export async function generateStaticParams() {
    const query = `*[_type == "successStory"] {
    "slug": slug.current
  }`;

    const stories = await client.fetch(query);
    return stories.map((story: { slug: string }) => ({
        slug: story.slug,
    }));
}

export default async function SuccessStoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const story = await getStory(slug);

    if (!story) {
        notFound();
    }

    const relatedStories = await getRelatedStories(slug);

    return (
        <PageLayout>
            <div className="min-h-screen bg-white">
                {/* Back Button */}
                <div className="container mx-auto max-w-4xl px-4 py-8">
                    <Button variant="ghost" asChild>
                        <Link href="/stories" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                            <ArrowLeft size={20} />
                            Πίσω στις Ιστορίες
                        </Link>
                    </Button>
                </div>

                {/* Article */}
                <article className="container mx-auto max-w-4xl px-4 pb-20">
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{story.title}</h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <Heart size={20} className="text-pink-500" />
                            <span className="font-medium">Νέος κηδεμόνας: {story.adopterName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={20} />
                            <span>{formatDate(story.adoptionDate, "short")}</span>
                        </div>
                        <div className="ml-auto">
                            <ShareButton variant="ghost" title={story.title} text={story.excerpt} className="text-pink-600 hover:text-pink-700" />
                        </div>
                    </div>

                    {/* Before/After Images */}
                    {story.beforeImage && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                                    <Image src={story.beforeImage} alt={`${story.animalName} - Πριν`} fill className="object-cover" />
                                </div>
                                <p className="text-center font-semibold text-gray-900">Πριν την υιοθεσία</p>
                            </div>
                            <div>
                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                                    <Image src={story.mainImage} alt={`${story.animalName} - Μετά`} fill className="object-cover" />
                                </div>
                                <p className="text-center font-semibold text-pink-600">Στο νέο του σπίτι! ❤️</p>
                            </div>
                        </div>
                    )}

                    {/* Main Image (if no before image) */}
                    {!story.beforeImage && (
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12">
                            <Image src={story.mainImage} alt={story.animalName} fill className="object-cover" priority />
                        </div>
                    )}

                    {/* Story Content */}
                    <div className="prose prose-lg max-w-none">
                        <PortableText value={story.story} components={portableTextComponents} />
                    </div>

                    {/* Share Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="bg-pink-50 rounded-2xl p-8 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Εμπνεύστηκες;</h3>
                            <p className="text-gray-700 mb-6">Υιοθέτησε κι εσύ ένα ζωάκι και γράψε τη δική σου ιστορία επιτυχίας</p>
                            <Button asChild className="bg-pink-500 hover:bg-pink-600">
                                <Link href="/animals">Δες Διαθέσιμα Ζωάκια</Link>
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Related Stories */}
                {relatedStories.length > 0 && (
                    <section className="bg-gray-50 py-20">
                        <div className="container mx-auto max-w-6xl px-4">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Περισσότερες Ιστορίες</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedStories.map((relatedStory) => (
                                    <Link key={relatedStory._id} href={`/stories/${relatedStory.slug}`}>
                                        <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all">
                                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                                <Image
                                                    src={relatedStory.mainImage}
                                                    alt={relatedStory.animalName}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">{relatedStory.title}</h3>
                                                <p className="text-sm text-gray-600 line-clamp-2">{relatedStory.excerpt}</p>
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
