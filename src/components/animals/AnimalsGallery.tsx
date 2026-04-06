"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Animal } from "@/types/animal";
import AnimalCard from "./AnimalCard";

const PAGE_SIZE = 12;

interface AnimalsGalleryProps {
    fetchedAnimals: Animal[];
}

function normalizeAccentsInString(str: string): string {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function getAgeCategory(age: number, ageUnit: string): string {
    const months = ageUnit === "Χρόνια" ? age * 12 : age;
    if (months < 12) return "baby";
    if (months < 36) return "young";
    if (months < 96) return "adult";
    return "senior";
}

function getSizeCategory(weight: number): string {
    if (weight < 5) return "small";
    if (weight < 15) return "medium";
    if (weight < 30) return "large";
    return "xlarge";
}

export default function AnimalsGallery({ fetchedAnimals }: AnimalsGalleryProps) {
    const [animals] = useState<Animal[]>(fetchedAnimals);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [speciesFilter, setSpeciesFilter] = useState("all");
    const [genderFilter, setGenderFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sizeFilter, setSizeFilter] = useState("all");
    const [ageFilter, setAgeFilter] = useState("all");
    const [page, setPage] = useState(1);

    const filteredAnimals = animals.filter((animal) => {
        if (search && !normalizeAccentsInString(animal.name).includes(normalizeAccentsInString(search))) return false;
        if (speciesFilter !== "all" && animal.species !== speciesFilter) return false;
        if (genderFilter !== "all" && animal.gender !== genderFilter) return false;
        if (statusFilter !== "all" && animal.status !== statusFilter) return false;
        if (sizeFilter !== "all" && getSizeCategory(animal.weight) !== sizeFilter) return false;
        if (ageFilter !== "all" && getAgeCategory(animal.age, animal.ageUnit) !== ageFilter) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredAnimals.length / PAGE_SIZE);
    const paginatedAnimals = filteredAnimals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const activeFilterCount = [search !== "", speciesFilter !== "all", genderFilter !== "all", statusFilter !== "all", sizeFilter !== "all", ageFilter !== "all"].filter(
        Boolean,
    ).length;

    const clearFilters = () => {
        setSearch("");
        setSpeciesFilter("all");
        setGenderFilter("all");
        setStatusFilter("all");
        setSizeFilter("all");
        setAgeFilter("all");
        setPage(1);
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
        setter(value);
        setPage(1);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative pt-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Βρες τον νέο σου φίλο</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">Τα ζωάκια που περιμένουν το παντοτινό τους σπίτι</p>

                        {/* Search bar */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Αναζήτηση με όνομα..."
                                className="w-full pl-12 pr-10 py-3 rounded-2xl border border-gray-200 bg-white shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent transition"
                            />
                            {search && (
                                <button onClick={() => handleSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="container mx-auto max-w-6xl px-4 py-10">
                {/* Filter Card */}
                <div className="bg-white rounded-2xl border border-gray-200 mb-12 overflow-hidden">
                    <button onClick={() => setFiltersOpen((prev) => !prev)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">Φίλτρα</span>
                            {activeFilterCount > 0 && <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500">{filteredAnimals.length === 1 ? `${filteredAnimals.length} ζωάκι` : `${filteredAnimals.length} ζωάκια`}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${filtersOpen ? "rotate-180" : ""}`} />
                        </div>
                    </button>

                    {filtersOpen && (
                        <div className="px-6 pb-5 border-t border-gray-100">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-5">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">ΕΙΔΟΣ</label>
                                    <Select value={speciesFilter} onValueChange={handleFilterChange(setSpeciesFilter)}>
                                        <SelectTrigger className="border-gray-300">
                                            <SelectValue placeholder="Όλα" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Όλα τα είδη</SelectItem>
                                            <SelectItem value="Σκύλος">Σκύλοι</SelectItem>
                                            <SelectItem value="Γάτα">Γάτες</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">ΦΥΛΟ</label>
                                    <Select value={genderFilter} onValueChange={handleFilterChange(setGenderFilter)}>
                                        <SelectTrigger className="border-gray-300">
                                            <SelectValue placeholder="Όλα" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Όλα τα φύλα</SelectItem>
                                            <SelectItem value="Αρσενικό">Αρσενικό</SelectItem>
                                            <SelectItem value="Θηλυκό">Θηλυκό</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">ΜΕΓΕΘΟΣ</label>
                                    <Select value={sizeFilter} onValueChange={handleFilterChange(setSizeFilter)}>
                                        <SelectTrigger className="border-gray-300">
                                            <SelectValue placeholder="Όλα" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Όλα τα μεγέθη</SelectItem>
                                            <SelectItem value="small">Μικρό (0–5 κιλά)</SelectItem>
                                            <SelectItem value="medium">Μεσαίο (5–15 κιλά)</SelectItem>
                                            <SelectItem value="large">Μεγάλο (15–30 κιλά)</SelectItem>
                                            <SelectItem value="xlarge">Πολύ μεγάλο (30+ κιλά)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">ΗΛΙΚΙΑ</label>
                                    <Select value={ageFilter} onValueChange={handleFilterChange(setAgeFilter)}>
                                        <SelectTrigger className="border-gray-300">
                                            <SelectValue placeholder="Όλες" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Όλες οι ηλικίες</SelectItem>
                                            <SelectItem value="baby">Κουτάβι / Γατάκι (&lt;1 έτος)</SelectItem>
                                            <SelectItem value="young">Νέο (1–3 έτη)</SelectItem>
                                            <SelectItem value="adult">Ενήλικο (3–8 έτη)</SelectItem>
                                            <SelectItem value="senior">Ηλικιωμένο (8+ έτη)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">ΚΑΤΑΣΤΑΣΗ</label>
                                    <Select value={statusFilter} onValueChange={handleFilterChange(setStatusFilter)}>
                                        <SelectTrigger className="border-gray-300">
                                            <SelectValue placeholder="Κατάσταση" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Όλα</SelectItem>
                                            <SelectItem value="Διαθέσιμο">Διαθέσιμο</SelectItem>
                                            <SelectItem value="Υιοθετήθηκε">Υιοθετήθηκε</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {activeFilterCount > 0 && (
                                <div className="mt-4 flex justify-end">
                                    <button onClick={clearFilters} className="text-sm text-pink-500 hover:text-pink-600 font-medium transition">
                                        Καθαρισμός φίλτρων
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Grid */}
                {filteredAnimals.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">{search ? `Δεν βρέθηκε ζωάκι με το όνομα "${search}"` : "Δεν βρέθηκαν ζωάκια με αυτά τα κριτήρια"}</p>
                        <button onClick={clearFilters} className="mt-4 text-pink-500 hover:text-pink-600 font-medium text-sm">
                            Καθαρισμός φίλτρων
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedAnimals.map((animal) => (
                                <AnimalCard key={animal._id} animal={animal} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => changePage(page - 1)}
                                    disabled={page === 1}
                                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                    const showPage = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                                    const showEllipsisBefore = p === page - 2 && page > 3;
                                    const showEllipsisAfter = p === page + 2 && page < totalPages - 2;

                                    if (showEllipsisBefore || showEllipsisAfter) {
                                        return (
                                            <span key={p} className="px-1 text-gray-400">
                                                …
                                            </span>
                                        );
                                    }
                                    if (!showPage) return null;

                                    return (
                                        <button
                                            key={p}
                                            onClick={() => changePage(p)}
                                            className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                                                p === page ? "bg-pink-500 text-white shadow-sm" : "border border-gray-200 text-gray-600 hover:border-pink-300 hover:text-pink-500"
                                            }`}>
                                            {p}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => changePage(page + 1)}
                                    disabled={page === totalPages}
                                    className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-500 disabled:opacity-30 disabled:cursor-not-allowed transition">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path
                                    d="M50,90 C50,90 10,60 10,35 C10,20 20,10 30,10 C40,10 45,15 50,25 C55,15 60,10 70,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Δεν βρήκες τον ιδανικό σου φίλο;</h2>
                            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                                Επικοινώνησε μαζί μας και θα σε βοηθήσουμε να βρεις το ζωάκι που ταιριάζει στον τρόπο ζωής σου
                            </p>
                            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold" asChild>
                                <Link href="/contact">Επικοινωνία</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
