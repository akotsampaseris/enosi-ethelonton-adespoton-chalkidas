import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Social from "./Social";

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Διάδωσε το Μήνυμα",
    description: "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.",
    openGraph: {
        ...defaultMetadata.openGraph,
        url: "https://eeach.gr/social",
        title: "Διάδωσε το Μήνυμα",
        description: "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.",
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Διάδωσε το Μήνυμα",
        description: "Βοήθησε να φτάσουμε σε περισσότερους ανθρώπους. Μοιράσου τις ιστορίες μας και βοήθησε περισσότερα ζώα να βρουν σπίτι.",
    },
};

export default function SocialPage() {
    return <Social />;
}
