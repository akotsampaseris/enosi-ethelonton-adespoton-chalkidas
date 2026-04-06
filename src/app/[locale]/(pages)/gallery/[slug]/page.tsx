import { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";
import { client } from "@/sanity/lib/client";
import CollectionPhotoGrid from "@/components/gallery/CollectionPhotoGrid";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/ui/PageLayout";
import { formatDate } from "@/lib/utils";
import ShareButton from "@/components/ui/ShareButton";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/types/portableText";
import { PhotoCollection } from "@/types/photoCollection";

async function getCollection(slug: string): Promise<PhotoCollection | null> {
    const query = `*[_type == "photoCollection" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    excerpt,
    description,
    date,
    "coverImage": coverImage.asset->url,
    "media": photos[]{
      _type,
      "url": asset->url,
      "mimeType": asset->mimeType
    }
  }`;

    return client.fetch(query, { slug });
}

export async function generateStaticParams() {
    const query = `*[_type == "photoCollection"] {
    "slug": slug.current
  }`;

    const collections = await client.fetch(query);

    return collections.map((collection: { slug: string }) => ({
        slug: collection.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const collection = await getCollection(slug);

    if (!collection) return defaultMetadata;

    const pageTitle = collection.title;
    const pageDescription = collection.excerpt;
    const ogImage = generatePageOgImage(pageTitle, pageDescription);

    return {
        ...defaultMetadata,
        title: collection.title,
        description: pageDescription,
        openGraph: {
            ...defaultMetadata.openGraph,
            url: `https://eeach.gr/gallery/${slug}`,
            title: collection.title,
            description: pageDescription,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: collection.title,
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: collection.title,
            description: pageDescription,
            images: [ogImage],
        },
    };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const collection = await getCollection(slug);

    if (!collection) {
        notFound();
    }

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12">
                        {/* Back Button */}
                        <Link href="/gallery" className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-6">
                            <ArrowLeft size={20} />
                            <span className="font-medium">Πίσω στις Συλλογές</span>
                        </Link>

                        {/* Title & Info */}
                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{collection.title}</h1>
                            <PortableText value={collection.description} components={portableTextComponents} />
                            <div className="flex items-center gap-4 text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>{formatDate(collection.date, "short")}</span>
                                </div>
                                <span>•</span>
                                <span>{collection.media.length} στοιχεία</span>
                                <span>
                                    <ShareButton variant="ghost" title={collection.title} text={collection.excerpt} className="text-pink-600 hover:text-pink-700" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Photo Grid */}
                    <CollectionPhotoGrid media={collection.media} collectionTitle={collection.title} />
                </div>
            </div>
        </PageLayout>
    );
}
