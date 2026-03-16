import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Donate from "./Donate";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = generatePageOgImage(
        "Υποστήριξε το Έργο μας",
        "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
    );

    return {
        ...defaultMetadata,
        title: "Υποστήριξε το Έργο μας",
        description: "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/donate",
            title: "Υποστήριξε το Έργο μας",
            description: "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Υποστήριξε το Έργο μας",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Υποστήριξε το Έργο μας",
            description: "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
            images: [ogImage],
        },
    };
}

export default function DonatePage() {
    return <Donate />;
}
