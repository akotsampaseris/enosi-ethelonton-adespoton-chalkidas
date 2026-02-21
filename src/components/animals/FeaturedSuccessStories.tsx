"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, Heart, Quote } from "lucide-react";
import type { SuccessStory } from "@/types/successStory";
import { formatDate } from "@/lib/utils";

interface SuccessStoriesProps {
    stories: SuccessStory[];
}

export function FeaturedSuccessStories({ stories }: SuccessStoriesProps) {
    return (
        <section className="bg-white px-6 py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
                        <Heart className="h-4 w-4 fill-current" />
                        Happy Endings
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Επιτυχημένες Υιοθεσίες</h2>
                    <p className="mt-4 text-lg text-gray-600">Αυτές οι όμορφες ιστορίες δείχνουν τη διαφορά που μπορεί να φέρει μια υιοθεσία</p>
                </motion.div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-8">
                            {/* Quote icon */}
                            <div className="absolute right-4 top-4 opacity-10">
                                <Quote className="h-24 w-24 text-pink-600" />
                            </div>

                            <Link key={story._id} href={`/stories/${story.slug}`}>
                                <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <Image src={story.mainImage} alt={story.animalName} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">{story.storyTitle}</h3>

                                        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{story.excerpt}</p>

                                        <div className="space-y-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Heart size={16} className="text-pink-500" />
                                                <span>{story.adopterName}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                <span>{formatDate(story.adoptionDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/stories"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-pink-600 px-8 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50">
                        Δες όλες τις ιστορίες
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>

                {/* If no stories, show placeholder */}
                {stories.length === 0 && (
                    <div className="mt-16 text-center">
                        <div className="inline-flex rounded-full bg-pink-100 p-6">
                            <Heart className="h-12 w-12 text-pink-600" />
                        </div>
                        <p className="mt-4 text-gray-600">Οι υιοθεσίες μας θα εμφανιστούν εδώ σύντομα!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
