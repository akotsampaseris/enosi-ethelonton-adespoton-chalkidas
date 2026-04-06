import { client } from "@/sanity/lib/client";
import FAQAccordion from "@/components/faq/FaqAccordion";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

export async function generateMetadata(): Promise<Metadata> {
    const ogImage = generatePageOgImage("Συχνές Ερωτήσεις", "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.");

    return {
        ...defaultMetadata,
        title: "Συχνές Ερωτήσεις",
        description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
        openGraph: {
            ...defaultMetadata.openGraph,
            url: "https://eeach.gr/faq",
            title: "Συχνές Ερωτήσεις",
            description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: "Συχνές Ερωτήσεις",
                },
            ],
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: "Συχνές Ερωτήσεις",
            description: "Βρες απαντήσεις στις πιο συχνές ερωτήσεις για υιοθεσία, φιλοξενία, εθελοντισμό και δωρεές.",
            images: [ogImage],
        },
    };
}

interface FAQ {
    _id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
}

interface FAQByCategory {
    [key: string]: FAQ[];
}

async function getFAQs(): Promise<FAQByCategory> {
    const query = `*[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`;

    const faqs = await client.fetch(query);

    // Group FAQs by category
    const grouped = faqs.reduce((acc: FAQByCategory, faq: FAQ) => {
        if (!acc[faq.category]) {
            acc[faq.category] = [];
        }
        acc[faq.category].push(faq);
        return acc;
    }, {});

    return grouped;
}

const categoryLabels: Record<string, { label: string; emoji: string }> = {
    adoption: { label: "Υιοθεσία", emoji: "🏠" },
    fostering: { label: "Φιλοξενία", emoji: "🤝" },
    volunteering: { label: "Εθελοντισμός", emoji: "🙋" },
    donations: { label: "Δωρεές", emoji: "💝" },
    general: { label: "Γενικά", emoji: "❓" },
};

export default async function FAQPage() {
    const faqsByCategory = await getFAQs();

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20">
                <div className="container mx-auto max-w-4xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Συχνές Ερωτήσεις</h1>
                    <p className="text-xl text-pink-100">Βρες απαντήσεις στις πιο συχνές ερωτήσεις σχετικά με την υιοθεσία, τη φιλοξενία και τον εθελοντισμό</p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-20">
                <div className="container mx-auto max-w-4xl px-4">
                    <FAQAccordion faqsByCategory={faqsByCategory} categoryLabels={categoryLabels} />
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Δεν βρήκες την απάντησή σου;</h2>
                        <p className="text-xl text-gray-600 mb-8">Είμαστε εδώ να σε βοηθήσουμε! Στείλε μας το ερώτημά σου.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors">
                                Επικοινωνία
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
