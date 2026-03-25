"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { PhotoCollection } from "@/types/photoCollection";
import { portableToPlainText } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface GalleryGridProps {
    collections: PhotoCollection[];
}

export default function GalleryGrid({ collections }: GalleryGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
                <Link
                    key={collection._id}
                    href={`/gallery/${collection.slug}`}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    {/* Cover Image */}
                    <Image src={collection.coverImage} alt={collection.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-pink-300 transition-colors">{collection.title}</h3>
                        <p className="text-sm text-gray-200 mb-3 line-clamp-2">{portableToPlainText(collection.description)}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar size={16} />
                            <span>{formatDate(collection.date)}</span>
                            <span className="ml-auto bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">{collection.media.length} φωτογραφίες</span>
                        </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-pink-400 transition-all rounded-2xl" />
                </Link>
            ))}
        </div>
    );
}
