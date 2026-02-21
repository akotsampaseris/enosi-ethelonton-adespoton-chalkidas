import { PortableTextBlock } from "@portabletext/react";

export interface SuccessStory {
    _id: string;
    title: string;
    animalName: string;
    slug: string;
    adopterName: string;
    adoptionDate: string;
    mainImage: string;
    beforeImage?: string;
    excerpt: string;
    story: PortableTextBlock;
    featured: boolean;
}
