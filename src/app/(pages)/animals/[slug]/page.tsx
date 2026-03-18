import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import AnimalDetails from "@/components/animals/AnimalDetails";
import { Animal } from "@/types/animal";
import PageLayout from "@/components/ui/PageLayout";
import { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { formatAge, formatWeight } from "@/lib/utils";
import { generateAnimalOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const animal = await getAnimal(slug);

    if (!animal) return {};

    const formattedAge = formatAge(animal.age, animal.ageUnit);
    const formattedWeight = formatWeight(animal.weight);
    const ogImageUrl = generateAnimalOgImage(animal.name, animal.gender, formattedAge, formattedWeight, animal.image);

    const shortDescription = `${animal.name}, ${formattedAge}, αναζητά οικογένεια! ${animal.description?.slice(0, 100)}...`;

    return {
        ...defaultMetadata,
        title: `${animal.name} | Προς Υιοθεσία`,
        description: shortDescription,
        openGraph: {
            ...defaultMetadata.openGraph,
            url: `https://eeach.gr/animals/${slug}`,
            title: `${animal.name} | Προς Υιοθεσία`,
            description: shortDescription,
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: animal.name,
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: `${animal.name} | Προς Υιοθεσία`,
            description: shortDescription,
            images: [ogImageUrl],
        },
    };
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getAnimal(slug: string): Promise<Animal | null> {
    const query = `*[_type == "animal" && slug.current == $slug][0] {
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
    "gallery": gallery[]{
      _type,
      "url": asset->url,
      "mimeType": asset->mimeType
    },
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
