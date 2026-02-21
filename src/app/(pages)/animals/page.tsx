import { client } from "@/sanity/lib/client";
import AnimalsGallery from "@/components/animals/AnimalsGallery";
import type { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

async function getAnimals(): Promise<AnimalType[]> {
    const query = `*[_type == "animal"] | order(_createdAt desc) {
    _id,
    name,
    species,
    age,
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

export const revalidate = 60; // Revalidate every 60 seconds
