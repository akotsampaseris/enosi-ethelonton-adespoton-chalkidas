"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimalCard from "./AnimalCard";
import type { AnimalType } from "@/types/animal";

interface FeaturedAnimalsProps {
  animals: AnimalType[];
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
            <AnimalCard key={animal._id} animal={animal} />
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/animals"
            className="inline-flex items-center gap-2 rounded-full border-2 border-pink-600 px-8 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
          >
            Δες όλα τα ζωάκια
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
