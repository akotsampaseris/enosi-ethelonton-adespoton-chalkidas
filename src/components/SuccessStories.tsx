"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Quote } from "lucide-react";

interface SuccessStory {
    id: string | number;
    animalName: string;
    adopterName?: string;
    adoptionDate: string;
    story: string;
    image?: {
        asset: {
            url: string;
        };
        alt?: string;
    };
}

interface SuccessStoriesProps {
    stories: SuccessStory[];
}

export function SuccessStories({ stories }: SuccessStoriesProps) {
    stories = [
        {
            id: 1,
            animalName: "Timos",
            adopterName: "Antony Kotsampaseris",
            adoptionDate: "2023-06-18",
            story: "Timos is a beautiful and energetic kitten who loves to play with his toys. He's been adopted by Antony Kotsampaseris, a passionate animal lover who has been raising him since he was just a few weeks old.",
            image: {
                asset: {
                    url: "/dog-high-quality-ultra-hd-8k-hdr-free-photo.jpg",
                },
            },
        },
        {
            id: 2,
            animalName: "Sonia",
            adopterName: "Antony Kotsampaseris",
            adoptionDate: "2023-06-18",
            story: "Timos is a beautiful and energetic kitten who loves to play with his toys. He's been adopted by Antony Kotsampaseris, a passionate animal lover who has been raising him since he was just a few weeks old.",
            image: {
                asset: {
                    url: "/dog-high-quality-ultra-hd-8k-hdr-free-photo.jpg",
                },
            },
        },
        {
            id: 3,
            animalName: "Πάμπλο",
            adopterName: "Antony Kotsampaseris",
            adoptionDate: "2023-06-18",
            story: "Timos is a beautiful and energetic kitten who loves to play with his toys. He's been adopted by Antony Kotsampaseris, a passionate animal lover who has been raising him since he was just a few weeks old.",
            image: {
                asset: {
                    url: "/dog-high-quality-ultra-hd-8k-hdr-free-photo.jpg",
                },
            },
        },
    ];

    return (
        <section className="bg-white px-6 py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
                        <Heart className="h-4 w-4 fill-current" />
                        Happy Endings
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Επιτυχημένες Υιοθεσίες
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Αυτές οι όμορφες ιστορίες δείχνουν τη διαφορά που μπορεί
                        να φέρει μια υιοθεσία
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-8"
                        >
                            {/* Quote icon */}
                            <div className="absolute right-4 top-4 opacity-10">
                                <Quote className="h-24 w-24 text-pink-600" />
                            </div>

                            {/* Image */}
                            {story.image?.asset?.url && (
                                <div className="relative mb-6 aspect-square overflow-hidden rounded-xl">
                                    <Image
                                        src={story.image.asset.url}
                                        alt={
                                            story.image.alt ||
                                            `${story.animalName} with ${story.adopterName}`
                                        }
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="relative">
                                <h3 className="text-xl font-bold text-gray-900">
                                    {story.animalName}
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Νέος κηδεμόνας: {story.adopterName}
                                </p>

                                <p className="mt-4 text-sm leading-relaxed text-gray-700">
                                    {story.story}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                                    <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                                    {new Date(
                                        story.adoptionDate,
                                    ).toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* If no stories, show placeholder */}
                {stories.length === 0 && (
                    <div className="mt-16 text-center">
                        <div className="inline-flex rounded-full bg-pink-100 p-6">
                            <Heart className="h-12 w-12 text-pink-600" />
                        </div>
                        <p className="mt-4 text-gray-600">
                            Οι υιοθεσίες μας θα εμφανιστούν εδώ σύντομα!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
