import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import AnimalFosterForm from "@/forms/AnimalFosterForm";
import { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        ...defaultMetadata,
        title: "Φιλοξενία Ζώων",
        description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
        openGraph: {
            ...defaultMetadata.openGraph,
            title: "Φιλοξενία Ζώων",
            description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Φιλοξενία Ζώων",
            description: "Γίνε προσωρινός κηδεμόνας και βοήθησε ένα ζώο μέχρι να βρει το μόνιμο σπίτι του. Η φιλοξενία σώζει ζωές.",
        },
    };
}

interface PageProps {
    searchParams: Promise<{
        animal?: string;
    }>;
}

async function getAnimal(slug: string): Promise<AnimalType | null> {
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

    let animal: AnimalType | undefined = undefined;

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
