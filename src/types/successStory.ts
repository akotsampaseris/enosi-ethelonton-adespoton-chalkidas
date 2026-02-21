export interface SuccessStory {
    _id: string;
    storyTitle: string;
    animalName: string;
    slug: string;
    adopterName: string;
    adoptionDate: string;
    mainImage: string;
    beforeImage?: string;
    excerpt: string;
    featured: boolean;
}
