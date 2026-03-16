import { PortableTextBlock } from "@portabletext/react";

export interface BlogPost {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    title: string;
    slug: string;
    excerpt: string;
    mainImage: string;
    publishedAt: string;
    author?: {
        name: string;
        image?: string;
    };
    categories?: string[];
    body: PortableTextBlock;
    featured: boolean;
}

export const CategoryLabels: Record<string, string> = {
    "adoption-stories": "Ιστορίες Υιοθεσίας",
    "animal-care": "Φροντίδα Ζώων",
    events: "Εκδηλώσεις",
    news: "Νέα",
    "tips-advice": "Συμβουλές",
    "volunteer-stories": "Ιστορίες Εθελοντών",
};
