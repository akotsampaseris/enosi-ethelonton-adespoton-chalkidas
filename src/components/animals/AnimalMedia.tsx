"use client";
import { useState } from "react";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import PhotoLightbox from "@/components/gallery/PhotoLightbox";
import { MediaItem } from "@/types/media";

interface AnimalMediaProps {
    media: MediaItem[];
    animalName: string;
    mainImage: string;
    status?: string;
    featured?: boolean;
}

export default function AnimalMedia({ media, animalName, mainImage, status, featured }: AnimalMediaProps) {
    const [activeThumb, setActiveThumb] = useState(0);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);

    const allMedia: MediaItem[] = [{ _type: "image", url: mainImage }, ...media];
    const isVideo = (item: MediaItem) => item._type === "file" && item.mimeType?.startsWith("video/");

    return (
        <>
            <div className="flex flex-col gap-3">
                {/* Main Image */}
                <button onClick={() => setSelectedMediaIndex(activeThumb)} className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
                    <Image src={allMedia[activeThumb].url} alt={animalName} fill className="object-cover" priority />

                    {/* Top Priority badge - top left */}
                    {featured && (
                        <div className="absolute top-4 left-4 flex items-center gap-1 bg-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                            <Star className="w-3 h-3 fill-white" />
                            Υψηλή Προτεραιότητα
                        </div>
                    )}

                    {/* Status badge - top right, only if not featured */}
                    {!featured && status && (
                        <div
                            className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold text-sm text-white shadow-lg ${
                                status === "Διαθέσιμο" ? "bg-green-500" : status === "Υιοθετήθηκε" ? "bg-gray-500" : "bg-blue-500"
                            }`}>
                            {status}
                        </div>
                    )}
                </button>

                {/* Horizontal Thumbnail Row */}
                {allMedia.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                        {allMedia.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveThumb(index)}
                                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all ${
                                    activeThumb === index ? "ring-4 ring-pink-500" : "opacity-70 hover:opacity-100"
                                }`}>
                                {isVideo(item) ? (
                                    <div className="relative w-full h-full">
                                        <video src={item.url} className="w-full h-full object-cover" preload="metadata" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                                <Play className="w-5 h-5 text-pink-600 fill-pink-600" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Image src={item.url} alt={`${animalName} - ${index + 1}`} fill className="object-cover" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selectedMediaIndex !== null && (
                <PhotoLightbox media={allMedia} initialIndex={selectedMediaIndex} collectionTitle={animalName} onClose={() => setSelectedMediaIndex(null)} />
            )}
        </>
    );
}
