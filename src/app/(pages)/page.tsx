import { client } from "@/sanity/lib/client";
import { Hero } from "@/components/Hero";
import { FeaturedAnimals } from "@/components/animals/FeaturedAnimals";
import { ImpactStats } from "@/components/ImpactStats";
import { HowToHelp } from "@/components/HowToHelp";
import { FeaturedSuccessStories } from "@/components/animals/FeaturedSuccessStories";
import { Newsletter } from "@/components/Newsletter";
import type { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";
import type { SuccessStory } from "@/types/successStory";

async function getAnimals(): Promise<AnimalType[]> {
    const query = `*[_type == "animal"] | order(_createdAt desc) {
    _id,
    name,
    species,
    age,
    gender,
    location,
    status,
    "image": image.asset->url,
    "slug": slug.current
  }`;

    const animals = await client.fetch(query);
    return animals;
}

async function getFeaturedStories(): Promise<SuccessStory[]> {
    const query = `*[_type == "successStory" && featured == true] | order(adoptionDate desc)[0...3] {
    _id,
    storyTitle,
    animalName,
    "slug": slug.current,
    adopterName,
    adoptionDate,
    "mainImage": mainImage.asset->url,
    excerpt
  }`;

    const stories = await client.fetch(query);
    return stories;
}

export default async function Home() {
    const animals = await getAnimals();
    const successStories = await getFeaturedStories();

    return (
        <PageLayout hasHero={true}>
            <main className="min-h-screen bg-white">
                <Hero />
                <FeaturedAnimals animals={animals} />
                <ImpactStats />
                <HowToHelp />
                <FeaturedSuccessStories stories={successStories} />
                <Newsletter />
            </main>
        </PageLayout>
    );
}
