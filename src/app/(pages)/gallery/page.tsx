import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { client } from "@/sanity/lib/client";
import PageLayout from "@/components/ui/PageLayout";

const pageTitle = "Φωτογραφίες & Βίντεο";
const pageDescription = "Στιγμές από τις δράσεις και τις εκδηλώσεις μας";
const ogImage = generatePageOgImage(pageTitle, pageDescription);

export const metadata: Metadata = {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
        ...defaultMetadata.openGraph,
        title: pageTitle,
        description: pageDescription,
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: pageTitle,
            },
        ],
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: pageTitle,
        description: pageDescription,
        images: [ogImage],
    },
};

interface PhotoCollection {
    _id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    photos: string[];
}

async function getPhotoCollections(): Promise<PhotoCollection[]> {
    const query = `*[_type == "photoCollection"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    "coverImage": coverImage.asset->url,
    "photos": photos[].asset->url
  }`;

    return client.fetch(query);
}

export default async function GalleryPage() {
    const collections = await getPhotoCollections();

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Φωτογραφίες & Βίντεο</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Στιγμές από τις δράσεις, τις εκδηλώσεις και την καθημερινότητα των ζώων μας</p>
                    </div>

                    {/* Gallery Grid */}
                    <GalleryGrid collections={collections} />
                </div>
            </div>
        </PageLayout>
    );
}
