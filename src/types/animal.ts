import { MediaItem } from "./media";

export interface AnimalData {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    name: string;
    slug: {
        current: string;
        _type: "slug";
    };
    species: "Σκύλος" | "Γάτα";
    age: number;
    ageUnit: "Χρόνια" | "Μήνες";
    weight: number;
    gender: "Αρσενικό" | "Θηλυκό";
    location: string;
    status: "Διαθέσιμο" | "Υιοθετήθηκε" | "Σε φιλοξενία";
    image: SanityImage;
    gallery: MediaItem[];
    description?: string;
    personality?: string[];
    goodWith?: GoodWith;
    medicalInfo?: MedicalInfo;
    rescueStory?: string;
    adoptedBy?: string;
    adoptionDate?: string;
}

export interface SanityImage {
    _type: "image";
    asset: {
        _ref: string;
        _type: "reference";
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}

export interface GoodWith {
    kids: boolean;
    dogs: boolean;
    cats: boolean;
}

export interface MedicalInfo {
    vaccinated: boolean;
    neutered: boolean;
    microchipped: boolean;
    specialNeeds?: string;
}

export type Animal = {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    name: string;
    species: "Σκύλος" | "Γάτα";
    age: number;
    ageUnit: "Χρόνια" | "Μήνες";
    weight: number;
    gender: "Αρσενικό" | "Θηλυκό";
    location: string;
    status: "Διαθέσιμο" | "Υιοθετήθηκε";
    image: string; // Transformed to URL
    slug: string; // Extracted from slug.current
    description?: string;
    personality?: string[];
    goodWith?: GoodWith;
    medicalInfo?: MedicalInfo;
    rescueStory?: string;
    gallery?: MediaItem[]; // Changed from string[] to MediaItem[]
    adoptedBy?: string;
    adoptionDate?: string;
};
