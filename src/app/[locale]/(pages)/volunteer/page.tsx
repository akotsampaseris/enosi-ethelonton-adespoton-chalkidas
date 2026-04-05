import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Volunteer from "./Volunteer";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

const ogImage = generatePageOgImage(
    "Γίνε Εθελοντής",
    "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
);

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Γίνε Εθελοντής",
    description: "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
    openGraph: {
        ...defaultMetadata.openGraph,
        url: "https://eeach.gr/volunteer",
        title: "Γίνε Εθελοντής",
        description: "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: "Γίνε Εθελοντής",
            },
        ],
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Γίνε Εθελοντής",
        description: "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
        images: [ogImage],
    },
};

export default function VolunteerPage() {
    return <Volunteer />;
}
