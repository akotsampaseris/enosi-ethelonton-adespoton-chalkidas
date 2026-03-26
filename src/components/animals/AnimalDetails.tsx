"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Heart, CheckCircle, XCircle, ArrowLeft, Sparkles } from "lucide-react";
import { Animal } from "@/types/animal";
import ShareButton from "@/components/ShareButton";
import { formatAge, formatWeight } from "@/lib/utils";
import AnimalMedia from "./AnimalMedia";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/types/portableText";
import { portableToPlainText } from "@/lib/utils";

interface AnimalDetailsProps {
    animal: Animal;
}

export default function AnimalDetails({ animal }: AnimalDetailsProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Back Button */}
            <div className="container mx-auto max-w-6xl px-4 pt-8">
                <Button variant="ghost" asChild className="mb-4">
                    <Link href="/animals" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft size={20} />
                        Πίσω στα ζωάκια
                    </Link>
                </Button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Media */}
                    <AnimalMedia media={animal.gallery || []} animalName={animal.name} mainImage={animal.image} status={animal.status} featured={animal.featured} />
                    {/* Right Column - Details */}
                    <div className="space-y-8">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{animal.name}</h1>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="text-base px-4 py-2 bg-gray-100">
                                    {animal.species}
                                </Badge>
                                <Badge variant="secondary" className="text-base px-4 py-2 bg-gray-100">
                                    {formatAge(animal.age, animal.ageUnit)}
                                </Badge>
                                <Badge variant="secondary" className="text-base px-4 py-2 bg-gray-100">
                                    {animal.gender}
                                </Badge>
                                <Badge variant="secondary" className="text-base px-4 py-2 bg-gray-100">
                                    {formatWeight(animal.weight)}
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin size={20} />
                                <span>{animal.location}</span>
                            </div>
                        </div>

                        {/* Description */}
                        {animal.description && (
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">
                                    Σχετικά με {animal.gender == "Αρσενικό" ? "τον" : "την"} {animal.name}
                                </h2>
                                <PortableText value={animal.description} components={portableTextComponents} />
                            </div>
                        )}

                        {/* Personality */}
                        {animal.personality && animal.personality.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="text-pink-500" size={20} />
                                    <h2 className="text-xl font-bold text-gray-900">Χαρακτήρας</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {animal.personality.map((trait) => (
                                        <Badge key={trait} variant="outline" className="px-4 py-2 border-pink-300 text-pink-700 bg-pink-50">
                                            {trait}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Good With */}
                        {animal.goodWith && (
                            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Τα πάει καλά με...</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {animal.goodWith.kids ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                                        ) : (
                                            <XCircle className="text-gray-300 flex-shrink-0" size={24} />
                                        )}
                                        <span className={animal.goodWith.kids ? "text-gray-900 font-medium" : "text-gray-400"}>Παιδιά</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {animal.goodWith.dogs ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                                        ) : (
                                            <XCircle className="text-gray-300 flex-shrink-0" size={24} />
                                        )}
                                        <span className={animal.goodWith.dogs ? "text-gray-900 font-medium" : "text-gray-400"}>Σκύλους</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {animal.goodWith.cats ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                                        ) : (
                                            <XCircle className="text-gray-300 flex-shrink-0" size={24} />
                                        )}
                                        <span className={animal.goodWith.cats ? "text-gray-900 font-medium" : "text-gray-400"}>Γάτες</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Medical Info */}
                        {animal.medicalInfo && (
                            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Ιατρικές Πληροφορίες</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {animal.medicalInfo.vaccinated ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                                        ) : (
                                            <XCircle className="text-gray-300 flex-shrink-0" size={24} />
                                        )}
                                        <span className={animal.medicalInfo.vaccinated ? "text-gray-900 font-medium" : "text-gray-400"}>
                                            {animal.gender == "Αρσενικό" ? "Εμβολιασμένος" : "Εμβολιασμένη"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {animal.medicalInfo.neutered ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                                        ) : (
                                            <XCircle className="text-gray-300 flex-shrink-0" size={24} />
                                        )}
                                        <span className={animal.medicalInfo.neutered ? "text-gray-900 font-medium" : "text-gray-400"}>
                                            {animal.gender == "Αρσενικό" ? "Στειρωμένος" : "Στειρωμένη"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {animal.medicalInfo.microchipped ? (
                                            <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                                        ) : (
                                            <XCircle className="text-gray-300 flex-shrink-0" size={24} />
                                        )}
                                        <span className={animal.medicalInfo.microchipped ? "text-gray-900 font-medium" : "text-gray-400"}>
                                            {animal.gender == "Αρσενικό" ? "Τσιπαρισμένος" : "Τσιπαρισμένη"}
                                        </span>
                                    </div>
                                    {animal.medicalInfo.specialNeeds && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 font-medium mb-2">Ειδικές Ανάγκες:</p>
                                            <p className="text-gray-700">{animal.medicalInfo.specialNeeds}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Rescue Story */}
                        {animal.rescueStory && (
                            <div className="bg-pink-50 border-l-4 border-pink-500 rounded-r-2xl p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">Η ιστορία διάσωσης</h2>
                                <p className="text-gray-700 leading-relaxed italic">{animal.rescueStory}</p>
                            </div>
                        )}

                        {/* Adoption Info - if already adopted */}
                        {animal.status === "Υιοθετήθηκε" && animal.adoptedBy && (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-green-900 mb-3">Βρήκε το σπίτι του! 🎉</h2>
                                <div className="space-y-2 text-green-800">
                                    <p>
                                        <strong>Υιοθετήθηκε από:</strong> {animal.adoptedBy}
                                    </p>
                                    {animal.adoptionDate && (
                                        <div className="flex items-center gap-2">
                                            <Calendar size={18} />
                                            <span>{new Date(animal.adoptionDate).toLocaleDateString("el-GR")}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        {animal.status === "Διαθέσιμο" && (
                            <div className="space-y-3 pt-4">
                                <Button size="lg" className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg py-6" asChild>
                                    <Link href={`/adopt?animal=${animal.slug}`}>
                                        <Heart className="mr-2" size={20} />
                                        Θέλω να υιοθετήσω {animal.gender == "Αρσενικό" ? "τον" : "την"} {animal.name}
                                    </Link>
                                </Button>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" size="lg" className="border-gray-300" asChild>
                                        <Link href={`/foster?animal=${animal.slug}`}>Φιλοξενία</Link>
                                    </Button>
                                    <ShareButton variant="outline" size="lg" title={animal.name} text={portableToPlainText(animal.description || [])} className="border-gray-300" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Similar Animals CTA */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Έχουμε και άλλα υπέροχα ζωάκια!</h2>
                        <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">Δες και τα υπόλοιπα ζωάκια που περιμένουν το παντοτινό τους σπίτι</p>
                        <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 font-semibold" asChild>
                            <Link href="/animals">Δες όλα τα ζωάκια</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
