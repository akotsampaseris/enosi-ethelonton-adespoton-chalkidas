import { PortableTextBlock } from "next-sanity";
import { MediaItem } from "./media";

export interface PhotoCollection {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    description: PortableTextBlock[];
    date: string;
    coverImage: string;
    media: MediaItem[];
}
