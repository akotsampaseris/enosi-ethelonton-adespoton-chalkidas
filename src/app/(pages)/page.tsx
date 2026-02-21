import { client } from "@/sanity/lib/client";
import { Hero } from "@/components/Hero";
import { FeaturedAnimals } from "@/components/animals/FeaturedAnimals";
import { ImpactStats } from "@/components/ImpactStats";
import { HowToHelp } from "@/components/HowToHelp";
import { SuccessStories } from "@/components/SuccessStories";
import { Newsletter } from "@/components/Newsletter";
import type { AnimalType } from "@/types/animal";
import PageLayout from "@/components/PageLayout";

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

async function getSuccessStories() {
    const stories = await client.fetch(`
    *[_type == "successStory"] | order(adoptionDate desc)[0...3] {
      _id,
      animalName,
      adopterName,
      adoptionDate,
      story,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `);
    return stories;
}

export default async function Home() {
    const animals = await getAnimals();
    const successStories = await getSuccessStories();

    return (
        <PageLayout hasHero={true}>
            <main className="min-h-screen bg-white">
                <Hero />
                <FeaturedAnimals animals={animals} />
                <ImpactStats />
                <HowToHelp />
                <SuccessStories stories={successStories} />
                <Newsletter />
            </main>
        </PageLayout>
    );
}
