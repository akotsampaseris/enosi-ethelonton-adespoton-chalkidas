import { PortableTextBlock } from "@portabletext/react";

export interface BlogPost {
    _id: string;
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
}
