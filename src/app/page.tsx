import { client } from "@/sanity/lib/client";
import { Hero } from "@/components/Hero";
import { FeaturedAnimals } from "@/components/FeaturedAnimals";
import { ImpactStats } from "@/components/ImpactStats";
import { HowToHelp } from "@/components/HowToHelp";
import { SuccessStories } from "@/components/SuccessStories";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

async function getAnimals() {
    const animals = await client.fetch(`
    *[_type == "animal" && status == "available"] | order(_createdAt desc)[0...6] {
      _id,
      name,
      slug,
      species,
      age,
      gender,
      description,
      image {
        asset->{
          _id,
          url
        },
        alt
      }
    }
  `);
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
        <main className="min-h-screen bg-white">
            <Hero />
            <FeaturedAnimals animals={animals} />
            <ImpactStats />
            <HowToHelp />
            <SuccessStories stories={successStories} />
            <Newsletter />
            <Footer />
        </main>
    );
}
