import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { AnimalType } from "@/types/animal";
import { Heart, Calendar, MapPin } from "lucide-react";

interface AnimalCardProps {
    animal: AnimalType;
}

const AnimalCard = ({ animal }: AnimalCardProps) => {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div key={animal._id} variants={item} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition hover:shadow-2xl">
            <Link href={`/animals/${animal.slug}`} className="block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {animal.image ? (
                        <Image src={animal.image} alt={animal.name} fill className="object-cover transition duration-500 group-hover:scale-110" />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
                            <Heart className="h-16 w-16 text-pink-300" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition">{animal.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {animal.species} • {animal.age} {animal.age === 1 ? "έτους" : "χρονών"} • {animal.gender} • {animal.weight} {animal.age === 1 ? "κιλό" : "κιλά"}
                            </p>
                        </div>
                    </div>

                    {animal.description && <p className="mt-4 line-clamp-2 text-sm text-gray-600">{animal.description}</p>}

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

                    <button className="mt-6 w-full rounded-full bg-pink-600 py-3 text-sm font-semibold text-white transition hover:bg-pink-700">Μάθε περισσότερα</button>
                </div>
            </Link>
        </motion.div>
    );
};

export default AnimalCard;
