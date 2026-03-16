import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Terms from "./Terms";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

const ogImage = generatePageOgImage("Όροι & Προϋποθέσεις", "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.");

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Όροι & Προϋποθέσεις",
    description: "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.",
    openGraph: {
        ...defaultMetadata.openGraph,
        url: "https://eeach.gr/terms",
        title: "Όροι & Προϋποθέσεις",
        description: "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.",
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: "Όροι & Προϋποθέσεις",
            },
        ],
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Όροι & Προϋποθέσεις",
        description: "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.",
        images: [ogImage],
    },
};

export default function TermsPage() {
    return <Terms />;
}
