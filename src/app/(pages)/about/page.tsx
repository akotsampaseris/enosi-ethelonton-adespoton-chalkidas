import type { Metadata } from "next";
import AboutPage from "./AboutPage";
import PageLayout from "@/components/PageLayout";
import { defaultMetadata } from "@/assets/metadata";

export async function generateMetadata(): Promise<Metadata> {
    return {
        ...defaultMetadata,
        title: "Σχετικά με Εμάς",
        description: "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2015.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/about",
            title: "Σχετικά με Εμάς",
            description: "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2015.",
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Σχετικά με Εμάς",
            description: "Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας διασώζει και φροντίζει αδέσποτα ζώα από το 2015.",
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
