"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Calendar, MapPin } from "lucide-react";

interface Animal {
    id: number | string;
    name: string;
    slug: string;
    species: string;
    age: string | number;
    gender: string;
    description?: string;
    image?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
}

interface FeaturedAnimalsProps {
    animals: Animal[];
}

export function FeaturedAnimals({ animals }: FeaturedAnimalsProps) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    animals = [
        {
            id: 1,
            name: "Τιμός",
            slug: "test",
            species: "Σκύλος",
            age: 5,
            gender: "Αρσενικό",
            image: {
                asset: {
                    url: "/dog-high-quality-ultra-hd-8k-hdr-free-photo.jpg",
                },
            },
        },
        {
            id: 2,
            name: "Σόνια",
            slug: "test",
            species: "Γάτα",
            age: 10,
            gender: "Θηλυκό",
            image: {
                asset: {
                    url: "/dog-high-quality-ultra-hd-8k-hdr-free-photo.jpg",
                },
            },
        },
    ];

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="bg-white px-6 py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Βρες τον νέο σου φίλο
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Τα ζωάκια που περιμένουν το παντοτινό τους σπίτι
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {animals.map((animal) => (
                        <motion.div
                            key={animal.id}
                            variants={item}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition hover:shadow-2xl"
                        >
                            <Link
                                href={`/animals/${animal.slug}`}
                                className="block"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                    {animal.image?.asset?.url ? (
                                        <Image
                                            src={animal.image.asset.url}
                                            alt={
                                                animal.image.alt || animal.name
                                            }
                                            fill
                                            className="object-cover transition duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                                            <Heart className="h-16 w-16 text-pink-300" />
                                        </div>
                                    )}

                                    {/* Favorite button */}
                                    <button
                                        className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur transition hover:bg-pink-50 hover:scale-110"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add to favorites functionality
                                        }}
                                    >
                                        <Heart className="h-5 w-5 text-pink-600" />
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition">
                                                {animal.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-600">
                                                {animal.species} • {animal.age}{" "}
                                                • {animal.gender}
                                            </p>
                                        </div>
                                    </div>

                                    {animal.description && (
                                        <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                                            {animal.description}
                                        </p>
                                    )}

                                    <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            Χαλκίδα, Ελλάδα
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Διαθέσιμο
                                        </span>
                                    </div>

                                    <button className="mt-6 w-full rounded-full bg-pink-600 py-3 text-sm font-semibold text-white transition hover:bg-pink-700">
                                        Μάθε περισσότερα
                                    </button>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-12 text-center">
                    <Link
                        href="/animals"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-pink-600 px-8 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
                    >
                        Δείτε όλα τα ζωάκια
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
