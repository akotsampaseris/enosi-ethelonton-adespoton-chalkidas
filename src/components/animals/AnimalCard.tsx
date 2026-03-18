import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Animal } from "@/types/animal";
import { Heart, Calendar, MapPin, Star } from "lucide-react";
import { formatAge, formatWeight } from "@/lib/utils";

interface AnimalCardProps {
    animal: Animal;
}

const AnimalCard = ({ animal }: AnimalCardProps) => {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={item} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition hover:shadow-2xl">
            <Link href={`/animals/${animal.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    {animal.image ? (
                        <Image src={animal.image} alt={animal.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                            <Heart className="h-16 w-16 text-pink-300" />
                        </div>
                    )}

                    {/* Top Priority badge */}
                    {animal.featured && (
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-pink-500 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-lg">
                            <Star className="w-3 h-3 fill-white" />
                            Υψηλή Προτεραιότητα
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition">{animal.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {animal.species} • {formatAge(animal.age, animal.ageUnit)} • {animal.gender} • {formatWeight(animal.weight)}
                            </p>
                        </div>
                    </div>

                    {animal.description && <p className="mt-4 line-clamp-2 text-sm text-gray-600">{animal.description}</p>}

                    <div className="mt-6 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {animal.location ?? "Χαλκίδα, Ελλάδα"}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {animal.status}
                        </span>
                    </div>

                    <button className="mt-6 w-full rounded-full bg-pink-600 py-3 text-sm font-semibold text-white transition hover:bg-pink-700">Μάθε περισσότερα</button>
                </div>
            </Link>
        </motion.div>
    );
};

export default AnimalCard;
