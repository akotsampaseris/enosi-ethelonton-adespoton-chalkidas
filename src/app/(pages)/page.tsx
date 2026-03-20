import { client } from "@/sanity/lib/client";
import { Hero } from "@/components/Hero";
import { FeaturedAnimals } from "@/components/animals/FeaturedAnimals";
import { ImpactStats } from "@/components/ImpactStats";
import { HowToHelp } from "@/components/HowToHelp";
import { FeaturedSuccessStories } from "@/components/animals/FeaturedSuccessStories";
import { Newsletter } from "@/components/Newsletter";
import type { Animal } from "@/types/animal";
import PageLayout from "@/components/ui/PageLayout";
import type { SuccessStory } from "@/types/successStory";
import RecentBlogPosts from "@/components/RecentBlogPosts";

async function getAnimals(): Promise<Animal[]> {
    const query = `*[_type == "animal"] | order(featured desc, _createdAt desc)[0...3] {
    _id,
    featured,
    name,
    species,
    age,
    ageUnit,
    gender,
    location,
    status,
    weight,
    "image": image.asset->url,
    "slug": slug.current
  }`;

    const animals = await client.fetch(query);
    return animals;
}

async function getFeaturedStories(): Promise<SuccessStory[]> {
    const query = `*[_type == "successStory"] | order(adoptionDate desc)[0...3] {
    _id,
    title,
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
                <RecentBlogPosts />
                <Newsletter />
            </main>
        </PageLayout>
    );
}
