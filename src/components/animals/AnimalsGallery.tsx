"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AnimalType } from "@/types/animal";
import AnimalCard from "./AnimalCard";

interface AnimalsGalleryProps {
    initialAnimals: AnimalType[];
}

export default function AnimalsGallery({
    initialAnimals,
}: AnimalsGalleryProps) {
    const [animals] = useState<AnimalType[]>(initialAnimals);
    const [speciesFilter, setSpeciesFilter] = useState<string>("all");
    const [genderFilter, setGenderFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("Διαθέσιμο");

    // Derive filtered animals instead of using effect
    const filteredAnimals = animals.filter((animal) => {
        if (speciesFilter !== "all" && animal.species !== speciesFilter) {
            return false;
        }
        if (genderFilter !== "all" && animal.gender !== genderFilter) {
            return false;
        }
        if (statusFilter !== "all" && animal.status !== statusFilter) {
            return false;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - matching homepage style */}
            <section className="relative py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Βρες τον νέο σου φίλο
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Τα ζωάκια που περιμένουν το παντοτινό τους σπίτι
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section - clean white card */}
            <section className="container mx-auto max-w-6xl px-4 pb-12">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Είδος
                            </label>
                            <Select
                                value={speciesFilter}
                                onValueChange={setSpeciesFilter}
                            >
                                <SelectTrigger className="border-gray-300">
                                    <SelectValue placeholder="Όλα τα είδη" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Όλα τα είδη
                                    </SelectItem>
                                    <SelectItem value="Σκύλος">
                                        Σκύλοι
                                    </SelectItem>
                                    <SelectItem value="Γάτα">Γάτες</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Φύλο
                            </label>
                            <Select
                                value={genderFilter}
                                onValueChange={setGenderFilter}
                            >
                                <SelectTrigger className="border-gray-300">
                                    <SelectValue placeholder="Όλα τα φύλα" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Όλα τα φύλα
                                    </SelectItem>
                                    <SelectItem value="Αρσενικό">
                                        Αρσενικό
                                    </SelectItem>
                                    <SelectItem value="Θηλυκό">
                                        Θηλυκό
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Κατάσταση
                            </label>
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="border-gray-300">
                                    <SelectValue placeholder="Κατάσταση" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Όλα</SelectItem>
                                    <SelectItem value="Διαθέσιμο">
                                        Διαθέσιμο
                                    </SelectItem>
                                    <SelectItem value="Υιοθετήθηκε">
                                        Υιοθετήθηκε
                                    </SelectItem>
                                    <SelectItem value="Σε φιλοξενία">
                                        Σε φιλοξενία
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-sm font-medium text-gray-500">
                                {filteredAnimals.length} ζωάκια
                            </p>
                        </div>
                    </div>
                </div>

                {/* Animals Grid - matching homepage card style */}
                {filteredAnimals.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            Δεν βρέθηκαν ζωάκια με αυτά τα κριτήρια
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnimals.map((animal) => (
                            <AnimalCard key={animal._id} animal={animal} />
                        ))}
                    </div>
                )}
            </section>

            {/* CTA Section - pink gradient matching your brand */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                        {/* Decorative heart shape */}
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                            <svg
                                viewBox="0 0 100 100"
                                className="w-full h-full"
                            >
                                <path
                                    d="M50,90 C50,90 10,60 10,35 C10,20 20,10 30,10 C40,10 45,15 50,25 C55,15 60,10 70,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Δεν βρήκες τον ιδανικό σου φίλο;
                            </h2>
                            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                                Επικοινώνησε μαζί μας και θα σε βοηθήσουμε να
                                βρεις το ζωάκι που ταιριάζει στον τρόπο ζωής σου
                            </p>
                            <Button
                                size="lg"
                                className="bg-white text-pink-600 hover:bg-pink-50 font-semibold"
                                asChild
                            >
                                <Link href="/contact">Επικοινωνία</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
