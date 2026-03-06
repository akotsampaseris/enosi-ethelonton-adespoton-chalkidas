import ContactForm from "@/forms/ContactForm";
import PageLayout from "@/components/PageLayout";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        ...defaultMetadata,
        title: "Επικοινωνία",
        description: "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.",
        openGraph: {
            ...defaultMetadata.openGraph,
            title: "Επικοινωνία",
            description: "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.",
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Επικοινωνία",
            description: "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.",
        },
    };
}

export default function ContactPage() {
    return (
        <PageLayout>
            <ContactForm />
        </PageLayout>
    );
}
