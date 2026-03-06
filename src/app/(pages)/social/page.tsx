import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Social from "./Social";

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Φιλοξενία Ζώων",
    description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
    openGraph: {
        ...defaultMetadata.openGraph,
        title: "Φιλοξενία Ζώων",
        description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Φιλοξενία Ζώων",
        description: "Γίνε προσωρινός κηδεμόνας και βοήθησε ένα ζώο μέχρι να βρει το μόνιμο σπίτι του. Η φιλοξενία σώζει ζωές.",
    },
};

export default function SocialPage() {
    return <Social />;
}
