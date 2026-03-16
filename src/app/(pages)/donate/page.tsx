import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import Donate from "./Donate";

export async function generateMetadata(): Promise<Metadata> {
    return {
        ...defaultMetadata,
        title: "Υποστήριξε το Έργο μας",
        description: "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/donate",
            title: "Υποστήριξε το Έργο μας",
            description: "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Υποστήριξε το Έργο μας",
            description: "Η δωρεά σου βοηθά να παρέχουμε κτηνιατρική φροντίδα, τροφή και καταφύγιο σε εκατοντάδες ζώα. Κάθε ευρώ κάνει τη διαφορά.",
        },
    };
}

export default function DonatePage() {
    return <Donate />;
}
