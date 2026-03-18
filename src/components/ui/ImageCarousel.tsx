"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type TransitionType = "fade" | "zoom" | "slide";

interface ImageCarouselProps {
    images: string[];
    interval?: number; // Duration in milliseconds (default: 3000)
    transition?: TransitionType; // Transition style (default: 'fade')
    showDots?: boolean; // Show dot indicators (default: true)
    showGradient?: boolean; // Show bottom gradient overlay (default: false)
    className?: string;
    alt?: string;
}

const transitions = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1 },
    },
    zoom: {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.7 },
    },
    slide: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 0.6 },
    },
};

export default function ImageCarousel({
    images,
    interval = 3000,
    transition = "fade",
    showDots = true,
    showGradient = false,
    className = "",
    alt = "Slideshow image",
}: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    if (!images || images.length === 0) {
        return null;
    }

    const currentTransition = transitions[transition];

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={currentTransition.initial}
                    animate={currentTransition.animate}
                    exit={currentTransition.exit}
                    transition={currentTransition.transition}
                    className="absolute inset-0">
                    <Image src={images[currentIndex]} alt={`${alt} ${currentIndex + 1}`} fill className="object-cover" priority={currentIndex === 0} />

                    {/* Optional gradient overlay */}
                    {showGradient && <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />}
                </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            {showDots && images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`rounded-full transition-all ${index === currentIndex ? "bg-white w-8 h-2" : "bg-white/50 w-2 h-2 hover:bg-white/80"}`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
