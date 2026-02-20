"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import HeroImageCarousel from "./ui/ImageCarousel";

const images = [
    "/images/carousel/1.jpeg",
    "/images/carousel/2.jpeg",
    "/images/carousel/3.jpeg",
];

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-purple-50">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/images/paw-pattern.jpg')] opacity-5" />

            <div className="relative mx-auto max-w-7xl px-6 py-30 sm:py-40 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Left column - Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Σε κάθε ζώο αξίζει ένα{" "}
                            <span className="text-pink-600">ζεστό σπίτι</span>
                        </h1>
                        <div className="mt-6 space-y-2">
                            <h3 className="text-2xl font-semibold leading-7 sm:text-inde">
                                Ένωση Εθελοντών Αδέσποτων Χαλκίδας
                            </h3>

                            <p className="text-lg leading-7 text-gray-600">
                                Διασώζουμε, φροντίζουμε και βρίσκουμε ένα σπίτι
                                για τα αδέσποτα ζώα στον δήμο μας. Σε κάθε ζώο
                                αξίζει ένα ζεστό σπίτι.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
                            <Link
                                href="/animals"
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-pink-700 hover:shadow-xl"
                            >
                                <Heart className="h-5 w-5" />
                                Υιοθέτησε ένα ζωάκι
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                href="/donate"
                                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-pink-600 px-8 py-4 text-base font-semibold text-pink-600 transition hover:bg-pink-50"
                            >
                                Στήριξε την αποστολή μας
                            </Link>
                        </div>

                        {/* Quick stats */}
                        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-pink-600">
                                    500+
                                </div>
                                <div className="mt-1 text-sm text-gray-600">
                                    Ζώα Διασώθηκαν
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-pink-600">
                                    300+
                                </div>
                                <div className="mt-1 text-sm text-gray-600">
                                    Υιοθεσίες
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-pink-600">
                                    24/7
                                </div>
                                <div className="mt-1 text-sm text-gray-600">
                                    Φροντίδα & Στήριξη
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right column - Hero image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <HeroImageCarousel images={images} />

                        {/* Floating badge */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-10 w-10 rounded-full bg-pink-200 ring-2 ring-white"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">
                                        50+ Εθελοντές
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        κάνουν τη διαφορά
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
