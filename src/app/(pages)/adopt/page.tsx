import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import AnimalAdoptionForm from "@/forms/AnimalAdoptionForm";
import { Animal } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

import { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

const ogImage = generatePageOgImage("Αίτηση Υιοθεσίας", "Συμπλήρωσε την αίτηση υιοθεσίας για να ξεκινήσεις τη διαδικασία. Βρες το νέο σου φίλο σήμερα.");

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Αίτηση Υιοθεσίας",
    description: "Συμπλήρωσε την αίτηση υιοθεσίας για να ξεκινήσεις τη διαδικασία. Βρες το νέο σου φίλο σήμερα.",
    openGraph: {
        ...defaultMetadata.openGraph,
        url: "https://eeach.gr/adopt",
        title: "Αίτηση Υιοθεσίας",
        description: "Συμπλήρωσε την αίτηση υιοθεσίας για να ξεκινήσεις τη διαδικασία. Βρες το νέο σου φίλο σήμερα.",
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: "Αίτηση Υιοθεσίας",
            },
        ],
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Αίτηση Υιοθεσίας",
        description: "Συμπλήρωσε την αίτηση υιοθεσίας για να ξεκινήσεις τη διαδικασία. Βρες το νέο σου φίλο σήμερα.",
        images: [ogImage],
    },
};

interface PageProps {
    searchParams: Promise<{
        animal?: string;
    }>;
}

async function getAnimal(slug: string): Promise<Animal | null> {
    const query = `*[_type == "animal" && slug.current == "${slug}"][0] {
    _id,
    name,
    species,
    age,
    gender,
    "image": image.asset->url,
    "slug": slug.current
  }`;

    const animal = await client.fetch(query);
    return animal;
}

export default async function AdoptPage({ searchParams }: PageProps) {
    const { animal: animalSlug } = await searchParams;

    let animal: Animal | undefined = undefined;

    if (animalSlug) {
        const fetchedAnimal = await getAnimal(animalSlug);
        if (!fetchedAnimal) {
            notFound();
        }
        animal = fetchedAnimal;
    }

    return (
        <PageLayout>
            <AnimalAdoptionForm animal={animal} />
        </PageLayout>
    );
}
