import { Metadata } from "next";

const siteName = "Ένωση Εθελοντών Αδέσποτων Χαλκίδας";
const siteUrl = "https://eeach.gr";
const description = "Διασώζουμε, φροντίζουμε και βρίσκουμε οικογένειες για αδέσποτα ζώα στη Χαλκίδα. Υιοθέτησε, φιλοξένησε ή γίνε εθελοντής σήμερα.";

export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteName,
        template: `%s | ${siteName}`,
    },
    description,
    keywords: [
        "υιοθεσία ζώων",
        "αδέσποτα ζώα",
        "Χαλκίδα",
        "καταφύγιο ζώων",
        "εθελοντισμός",
        "φιλοζωία",
        "διάσωση ζώων",
        "υιοθεσία σκύλου",
        "υιοθεσία γάτας",
        "φιλοξενία ζώων",
        "animal rescue Chalkida",
        "adopt dog Greece",
        "animal shelter Evia",
        "Εύβοια",
    ],
    authors: [
        {
            name: siteName,
            url: siteUrl,
        },
    ],
    creator: siteName,
    publisher: siteName,
    openGraph: {
        type: "website",
        locale: "el_GR",
        url: siteUrl,
        siteName,
        title: {
            default: siteName,
            template: `%s | ${siteName}`,
        },
        description,
        images: [
            {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: siteName,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: {
            default: siteName,
            template: `%s | ${siteName}`,
        },
        description,
        images: ["/logo.jpg"],
    },
};
