import { client } from "@/sanity/lib/client";
import AnimalsGallery from "@/components/animals/AnimalsGallery";
import type { Animal } from "@/types/animal";
import PageLayout from "@/components/ui/PageLayout";

import { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = generatePageOgImage(
        "Διαθέσιμα Ζώα για Υιοθεσία",
        "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια.",
    );

    return {
        ...defaultMetadata,
        title: "Διαθέσιμα Ζώα για Υιοθεσία",
        description: "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/animals",
            title: "Διαθέσιμα Ζώα για Υιοθεσία",
            description: "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Διαθέσιμα Ζώα για Υιοθεσία",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Διαθέσιμα Ζώα για Υιοθεσία",
            description: "Δες όλα τα αδέσποτα ζώα που αναζητούν ένα αγαπημένο σπίτι. Σκύλοι, γάτες και άλλα ζώα περιμένουν να γνωρίσουν τη νέα τους οικογένεια.",
            images: [ogImage],
        },
    };
}

async function getAnimals(): Promise<Animal[]> {
    const query = `*[_type == "animal"] | order(featured desc, _createdAt desc) {
        _id, name, species, age, ageUnit, weight, gender, location, status, featured,
        "image": image.asset->url,
        "slug": slug.current
    }`;
    return await client.fetch(query);
}

export default async function AnimalsPage() {
    const animals = await getAnimals();

    return (
        <PageLayout>
            <AnimalsGallery fetchedAnimals={animals} />
        </PageLayout>
    );
}
