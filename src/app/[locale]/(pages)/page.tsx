import { client } from "@/sanity/lib/client";
import { Hero } from "@/components/home/Hero";
import { FeaturedAnimals } from "@/components/home/FeaturedAnimals";
import { ImpactStats } from "@/components/home/ImpactStats";
import { HowToHelp } from "@/components/home/HowToHelp";
import { FeaturedSuccessStories } from "@/components/home/FeaturedSuccessStories";
import { Newsletter } from "@/components/home/Newsletter";
import type { Animal } from "@/types/animal";
import PageLayout from "@/components/ui/PageLayout";
import type { SuccessStory } from "@/types/successStory";
import { RecentBlogPosts } from "@/components/home/RecentBlogPosts";
import type { BlogPost } from "@/types/blogPost";

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

async function getRecentPosts(): Promise<BlogPost[]> {
    const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "mainImage": mainImage.asset->url,
    publishedAt,
    categories
  }`;

    const posts = await client.fetch(query);
    return posts;
}

export default async function Home() {
    const animals = await getAnimals();
    const successStories = await getFeaturedStories();
    const posts = await getRecentPosts();

    return (
        <PageLayout hasHero={true}>
            <main className="min-h-screen bg-white">
                <Hero />
                <FeaturedAnimals animals={animals} />
                <ImpactStats />
                <HowToHelp />
                <FeaturedSuccessStories stories={successStories} />
                <RecentBlogPosts posts={posts} />
                <Newsletter />
            </main>
        </PageLayout>
    );
}
