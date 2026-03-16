import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Social from "./Social";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

const ogImage = generatePageOgImage("Διάδωσε το Μήνυμα", "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.");

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Διάδωσε το Μήνυμα",
    description: "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.",
    openGraph: {
        ...defaultMetadata.openGraph,
        url: "https://eeach.gr/social",
        title: "Διάδωσε το Μήνυμα",
        description: "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.",
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: "Διάδωσε το Μήνυμα",
            },
        ],
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Διάδωσε το Μήνυμα",
        description: "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.",
        images: [ogImage],
    },
};

export default function SocialPage() {
    return <Social />;
}
