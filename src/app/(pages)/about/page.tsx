import type { Metadata } from "next";
import AboutPage from "./AboutPage";
import PageLayout from "@/components/ui/PageLayout";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = generatePageOgImage("Σχετικά με Εμάς", "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2013.");

    return {
        ...defaultMetadata,
        title: "Σχετικά με Εμάς",
        description: "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2013.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/about",
            title: "Σχετικά με Εμάς",
            description: "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2013.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Σχετικά με Εμάς",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Σχετικά με Εμάς",
            description: "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2013.",
            images: [ogImage],
        },
    };
}

export default async function About() {
    return (
        <PageLayout>
            <AboutPage />
        </PageLayout>
    );
}
