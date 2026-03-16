import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

import { Animal } from "@/types/animal";
import { BlogPost } from "@/types/blogPost";
import { SuccessStory } from "@/types/successStory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://eeach.gr";

    // Fetch all animals
    const animals = await client.fetch(`
    *[_type == "animal" && status == "Διαθέσιμο"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

    // Fetch all blog posts
    const posts = await client.fetch(`
    *[_type == "post"] {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `);

    // Fetch all success stories
    const stories = await client.fetch(`
    *[_type == "successStory"] {
      "slug": slug.current,
      _updatedAt
    }
  `);

    // Static pages
    const staticPages = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/animals`,
            lastModified: new Date(),
            changeFrequency: "daily" as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/stories`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/volunteer`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/donate`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/foster`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/social`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        },
        {
            url: `${baseUrl}/adopt/process`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        },
    ];

    // Dynamic animal pages
    const animalPages = animals.map((animal: Animal) => ({
        url: `${baseUrl}/animals/${animal.slug}`,
        lastModified: new Date(animal._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Dynamic blog pages
    const blogPages = posts.map((post: BlogPost) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    // Dynamic success story pages
    const storyPages = stories.map((story: SuccessStory) => ({
        url: `${baseUrl}/stories/${story.slug}`,
        lastModified: new Date(story._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...animalPages, ...blogPages, ...storyPages];
}
