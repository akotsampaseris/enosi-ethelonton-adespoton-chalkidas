import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import AnimalFosterForm from "@/forms/AnimalFosterForm";
import { Animal } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = generatePageOgImage("Φιλοξενία Ζώων", "Γίνε προσωρινός κηδεμόνας και βοήθησε ένα ζώο μέχρι να βρει το μόνιμο σπίτι του. Η φιλοξενία σώζει ζωές.");

    return {
        ...defaultMetadata,
        title: "Φιλοξενία Ζώων",
        description: "Γίνε προσωρινός κηδεμόνας και βοήθησε ένα ζώο μέχρι να βρει το μόνιμο σπίτι του. Η φιλοξενία σώζει ζωές.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/foster",
            title: "Φιλοξενία Ζώων",
            description: "Γίνε προσωρινός κηδεμόνας και βοήθησε ένα ζώο μέχρι να βρει το μόνιμο σπίτι του. Η φιλοξενία σώζει ζωές.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Φιλοξενία Ζώων",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Φιλοξενία Ζώων",
            description: "Γίνε προσωρινός κηδεμόνας και βοήθησε ένα ζώο μέχρι να βρει το μόνιμο σπίτι του. Η φιλοξενία σώζει ζωές.",
            images: [ogImage],
        },
    };
}

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

export default async function FosterPage({ searchParams }: PageProps) {
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
            <AnimalFosterForm animal={animal} />
        </PageLayout>
    );
}
