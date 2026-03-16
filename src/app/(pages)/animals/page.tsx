import { client } from "@/sanity/lib/client";
import AnimalsGallery from "@/components/animals/AnimalsGallery";
import type { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

import { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        ...defaultMetadata,
        title: "Διαθέσιμα Ζώα για Υιοθεσία",
        description: "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/animals",
            title: "Διαθέσιμα Ζώα για Υιοθεσία",
            description: "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια",
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Διαθέσιμα Ζώα για Υιοθεσία",
            description: "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια",
        },
    };
}

async function getAnimals(): Promise<AnimalType[]> {
    const query = `*[_type == "animal"] | order(_createdAt desc) {
    _id,
    name,
    species,
    age,
    ageUnit,
    weight,
    gender,
    location,
    status,
    "image": image.asset->url,
    "slug": slug.current
  }`;

    const animals = await client.fetch(query);
    return animals;
}

export default async function AnimalsPage() {
    const animals = await getAnimals();

    return (
        <PageLayout>
            <AnimalsGallery initialAnimals={animals} />
        </PageLayout>
    );
}
