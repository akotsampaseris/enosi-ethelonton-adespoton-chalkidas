import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Volunteer from "./Volunteer";

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Γίνε Εθελοντής",
    description: "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
    openGraph: {
        ...defaultMetadata.openGraph,
        title: "Γίνε Εθελοντής",
        description: "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Γίνε Εθελοντής",
        description: "Βοήθησε να σώσουμε περισσότερα ζώα. Γίνε μέρος της ομάδας μας ως εθελοντής - χρειαζόμαστε βοήθεια σε φιλοξενία, μεταφορές, εκδηλώσεις και άλλα.",
    },
};

export default function VolunteerPage() {
    return <Volunteer />;
}
