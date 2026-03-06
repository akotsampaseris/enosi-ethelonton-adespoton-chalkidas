import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Terms from "./Terms";

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Όροι & Προϋποθέσεις",
    description: "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.",
    openGraph: {
        ...defaultMetadata.openGraph,
        title: "Όροι & Προϋποθέσεις",
        description: "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.",
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Όροι & Προϋποθέσεις",
        description: "Διάβασε τους όρους χρήσης, υιοθεσίας, φιλοξενίας και εθελοντισμού της οργάνωσής μας.",
    },
};

export default function TermsPage() {
    return <Terms />;
}
