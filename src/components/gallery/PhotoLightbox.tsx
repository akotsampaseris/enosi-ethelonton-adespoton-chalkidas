"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoCollection {
    _id: string;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    photos: string[];
}

interface PhotoLightboxProps {
    collection: PhotoCollection;
    onClose: () => void;
}

export default function PhotoLightbox({ collection, onClose }: PhotoLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % collection.photos.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + collection.photos.length) % collection.photos.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [currentIndex]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("el-GR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm" onClick={onClose}>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent z-10">
                <div className="container mx-auto flex items-start justify-between">
                    <div className="text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{collection.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar size={16} />
                            <span>{formatDate(collection.date)}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <X className="text-white" size={24} />
                    </button>
                </div>
            </div>

            {/* Main Photo */}
            <div className="h-full w-full flex items-center justify-center px-4 md:px-16 py-20" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full max-w-6xl max-h-full">
                        <Image src={collection.photos[currentIndex]} alt={`${collection.title} - Photo ${currentIndex + 1}`} fill className="object-contain" priority />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons - Desktop */}
            {collection.photos.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevious();
                        }}
                        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                        <ChevronLeft className="text-white" size={32} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNext();
                        }}
                        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                        <ChevronRight className="text-white" size={32} />
                    </button>
                </>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/50 to-transparent">
                <div className="container mx-auto">
                    {/* Counter */}
                    <div className="text-white text-center mb-4">
                        <span className="text-lg font-medium">
                            {currentIndex + 1} / {collection.photos.length}
                        </span>
                    </div>

                    {/* Thumbnail Strip - Hidden on mobile */}
                    <div className="hidden md:flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {collection.photos.map((photo, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentIndex(index);
                                }}
                                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                                    index === currentIndex ? "ring-2 ring-pink-400 scale-105" : "opacity-50 hover:opacity-100"
                                }`}>
                                <Image src={photo} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Mobile Swipe Navigation */}
                    {collection.photos.length > 1 && (
                        <div className="flex md:hidden gap-4 justify-center mt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToPrevious();
                                }}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                                <ChevronLeft className="text-white" size={24} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToNext();
                                }}
                                className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                                <ChevronRight className="text-white" size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
