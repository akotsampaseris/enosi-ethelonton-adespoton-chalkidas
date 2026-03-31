"use client";
import { useState, useRef } from "react";
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

    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isMouseDown = useRef(false);

    const allMedia: MediaItem[] = [{ _type: "image", url: mainImage }, ...media];
    const isVideo = (item: MediaItem) => item._type === "video" && item.mimeType?.startsWith("video/");

    const onMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        isMouseDown.current = true;
        isDragging.current = false;
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft.current = sliderRef.current.scrollLeft;
        e.preventDefault();
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isMouseDown.current || !sliderRef.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const delta = x - startX.current;
        if (Math.abs(delta) > 5) isDragging.current = true;
        sliderRef.current.scrollLeft = scrollLeft.current - delta;
    };

    const onMouseUp = () => {
        isMouseDown.current = false;
        setTimeout(() => {
            isDragging.current = false;
        }, 0);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        if (!sliderRef.current) return;
        isDragging.current = false;
        startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
        scrollLeft.current = sliderRef.current.scrollLeft;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!sliderRef.current) return;
        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
        const delta = x - startX.current;
        if (Math.abs(delta) > 5) isDragging.current = true;
        sliderRef.current.scrollLeft = scrollLeft.current - delta;
    };

    const onTouchEnd = () => {
        setTimeout(() => {
            isDragging.current = false;
        }, 0);
    };

    const onThumbClick = (index: number) => {
        if (isDragging.current) return;
        setActiveThumb(index);
    };

    const activeItem = allMedia[activeThumb];
    const activeIsVideo = isVideo(activeItem);

    return (
        <>
            <div className="flex flex-col gap-3">
                {/* Main Display */}
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
                    {activeIsVideo ? (
                        <>
                            <video key={activeItem.url} src={activeItem.url} className="w-full h-full object-cover" preload="metadata" muted playsInline />
                            <button
                                onClick={() => setSelectedMediaIndex(activeThumb)}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-5 shadow-xl">
                                    <Play className="w-10 h-10 text-pink-600 fill-pink-600" />
                                </div>
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setSelectedMediaIndex(activeThumb)} className="absolute inset-0 w-full h-full cursor-pointer">
                            <Image src={activeItem.url} alt={animalName} fill className="object-cover" priority />
                        </button>
                    )}

                    {/* Badges — on top of everything */}
                    {featured && (
                        <div className="absolute top-4 left-4 flex items-center gap-1 bg-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg pointer-events-none z-10">
                            <Star className="w-3 h-3 fill-white" />
                            Κορυφαία Προτεραιότητα
                        </div>
                    )}
                    {!featured && status && (
                        <div
                            className={`absolute top-4 right-4 px-4 py-2 rounded-full font-semibold text-sm text-white shadow-lg pointer-events-none z-10 ${
                                status === "Διαθέσιμο" ? "bg-green-500" : status === "Υιοθετήθηκε" ? "bg-pink-500" : "bg-blue-500"
                            }`}>
                            {status}
                        </div>
                    )}
                </div>

                {/* Thumbnail Slider */}
                {allMedia.length > 1 && (
                    <div
                        ref={sliderRef}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        className="flex overflow-x-auto pb-2 scrollbar-hide cursor-grab active:cursor-grabbing select-none">
                        {allMedia.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => onThumbClick(index)}
                                className={`relative flex-shrink-0 w-24 h-24 my-2 mx-1.5 rounded-2xl overflow-hidden cursor-pointer transition-opacity ${
                                    activeThumb === index ? "outline outline-4 outline-pink-500 outline-offset-2" : "opacity-70 hover:opacity-100"
                                }`}>
                                {isVideo(item) ? (
                                    <div className="relative w-full h-full">
                                        <video src={item.url} className="w-full h-full object-cover" preload="metadata" muted playsInline />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                                                <Play className="w-4 h-4 text-pink-600 fill-pink-600" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Image src={item.url} alt={`${animalName} - ${index + 1}`} fill className="object-cover" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedMediaIndex !== null && (
                <PhotoLightbox media={allMedia} initialIndex={selectedMediaIndex} collectionTitle={animalName} onClose={() => setSelectedMediaIndex(null)} />
            )}
        </>
    );
}
