"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface MediaItem {
    _type: "image" | "file";
    url: string;
    mimeType?: string;
}

interface PhotoLightboxProps {
    media: MediaItem[];
    initialIndex: number;
    collectionTitle: string;
    onClose: () => void;
}

export default function PhotoLightbox({ media, initialIndex, collectionTitle, onClose }: PhotoLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const isVideo = (item: MediaItem) => {
        return item._type === "file" && item.mimeType?.startsWith("video/");
    };

    const currentItem = media[currentIndex];
    const isCurrentVideo = isVideo(currentItem);

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % media.length);
    };

    const goToPrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    };

    // Pause video when changing slides
    useEffect(() => {
        if (videoRef.current && !isCurrentVideo) {
            videoRef.current.pause();
        }
    }, [currentIndex, isCurrentVideo]);

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

    // Handle swipe gesture
    const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;

        if (info.offset.x > swipeThreshold) {
            goToPrevious();
        } else if (info.offset.x < -swipeThreshold) {
            goToNext();
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm" onClick={onClose}>
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/50 to-transparent z-10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-white">
                        <h2 className="text-xl md:text-2xl font-bold">{collectionTitle}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                        <X className="text-white" size={24} />
                    </button>
                </div>
            </div>

            {/* Main Media with Swipe Support */}
            <div className="h-full w-full flex items-center justify-center px-4 md:px-16 py-20 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag={!isCurrentVideo ? "x" : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className={`relative w-full h-full max-w-6xl max-h-full ${!isCurrentVideo ? "cursor-grab active:cursor-grabbing" : ""}`}>
                        {isCurrentVideo ? (
                            <video ref={videoRef} src={currentItem.url} controls autoPlay className="w-full h-full object-contain" onClick={(e) => e.stopPropagation()} />
                        ) : (
                            <Image
                                src={currentItem.url}
                                alt={`${collectionTitle} - Photo ${currentIndex + 1}`}
                                fill
                                className="object-contain pointer-events-none"
                                priority
                                draggable={false}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {media.length > 1 && (
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
                            {currentIndex + 1} / {media.length}
                        </span>
                    </div>

                    {/* Mobile Navigation */}
                    {media.length > 1 && (
                        <div className="flex md:hidden gap-4 justify-center">
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

                    {/* Swipe Hint (only for images) */}
                    {!isCurrentVideo && <div className="md:hidden text-center mt-4 text-white/50 text-sm">← Σύρε για περισσότερες →</div>}
                </div>
            </div>
        </motion.div>
    );
}
