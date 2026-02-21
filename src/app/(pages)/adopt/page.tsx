import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import AnimalAdoptionForm from "@/forms/AnimalAdoptionForm";
import { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

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

export default async function AdoptPage({ searchParams }: PageProps) {
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
            <AnimalAdoptionForm animal={animal} />
        </PageLayout>
    );
}
