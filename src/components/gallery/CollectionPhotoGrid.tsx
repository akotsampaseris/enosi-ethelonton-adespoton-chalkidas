"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import PhotoLightbox from "@/components/gallery/PhotoLightbox";

interface MediaItem {
    _type: "image" | "file";
    url: string;
    mimeType?: string;
}

interface CollectionPhotoGridProps {
    media: MediaItem[];
    collectionTitle: string;
}

export default function CollectionPhotoGrid({ media, collectionTitle }: CollectionPhotoGridProps) {
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

    const isVideo = (item: MediaItem) => {
        return item._type === "file" && item.mimeType?.startsWith("video/");
    };

    return (
        <>
            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {media.map((item, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setSelectedMediaIndex(index)}
                        className="relative block w-full break-inside-avoid rounded-xl overflow-hidden group cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}>
                        {/* Image or Video Thumbnail */}
                        <div className="relative aspect-auto">
                            {isVideo(item) ? (
                                // Video Thumbnail
                                <div className="relative w-full">
                                    <video src={item.url} className="w-full h-auto object-cover" preload="metadata" />
                                    {/* Play Icon Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                                            <Play className="w-8 h-8 text-pink-600 fill-pink-600" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Image
                                <Image src={item.url} alt={`${collectionTitle} - Photo ${index + 1}`} width={600} height={800} className="w-full h-auto object-cover" />
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                            {/* Hover Icon (for images only) */}
                            {!isVideo(item) && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                                        <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Lightbox */}
            {selectedMediaIndex !== null && (
                <PhotoLightbox media={media} initialIndex={selectedMediaIndex} collectionTitle={collectionTitle} onClose={() => setSelectedMediaIndex(null)} />
            )}
        </>
    );
}
