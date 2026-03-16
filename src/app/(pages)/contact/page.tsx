import ContactForm from "@/forms/ContactForm";
import PageLayout from "@/components/PageLayout";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = generatePageOgImage("Επικοινωνία", "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.");

    return {
        ...defaultMetadata,
        title: "Επικοινωνία",
        description: "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/contact",
            title: "Επικοινωνία",
            description: "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Επικοινωνία",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Επικοινωνία",
            description: "Έλα σε επαφή μαζί μας για ερωτήσεις, υιοθεσίες, εθελοντισμό ή οτιδήποτε άλλο. Είμαστε εδώ να βοηθήσουμε.",
            images: [ogImage],
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
