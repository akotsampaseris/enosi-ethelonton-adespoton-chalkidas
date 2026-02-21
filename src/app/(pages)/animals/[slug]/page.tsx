import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import AnimalDetails from "@/components/animals/AnimalDetails";
import { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getAnimal(slug: string): Promise<AnimalType | null> {
  const query = `*[_type == "animal" && slug.current == $slug][0] {
    _id,
    name,
    species,
    age,
    weight,
    gender,
    location,
    status,
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    "slug": slug.current,
    description,
    personality,
    goodWith,
    medicalInfo,
    rescueStory,
    adoptedBy,
    adoptionDate
  }`;
  const animal = await client.fetch(query, { slug });
  return animal;
}

// Generate static params for all animals
export async function generateStaticParams() {
  const query = `*[_type == "animal"] {
    "slug": slug.current
  }`;

  const animals = await client.fetch(query);

  return animals.map((animal: { slug: string }) => ({
    slug: animal.slug,
  }));
}

export default async function AnimalPage({ params }: PageProps) {
  const { slug } = await params;
  const animal = await getAnimal(slug);

  if (!animal) {
    notFound();
  }

  return (
    <PageLayout>
      <AnimalDetails animal={animal} />
    </PageLayout>
  );
}

export const revalidate = 60; // Revalidate every 60 seconds
