import VolunteerApplicationForm from "@/forms/VolunteerApplicationForm";
import PageLayout from "@/components/ui/PageLayout";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";
import { generatePageOgImage } from "@/lib/ogImageGeneration";

const ogImage = generatePageOgImage("Αίτηση Εθελοντισμού", "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.");

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Αίτηση Εθελοντισμού",
    description: "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.",
    openGraph: {
        ...defaultMetadata.openGraph,
        url: "https://eeach.gr/volunteer/apply",
        title: "Αίτηση Εθελοντισμού",
        description: "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.",
        images: [
            {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: "Αίτηση Εθελοντισμού",
            },
        ],
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Αίτηση Εθελοντισμού",
        description: "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.",
        images: [ogImage],
    },
};

export default function VolunteerApplicationPage() {
    return (
        <PageLayout>
            <VolunteerApplicationForm />
        </PageLayout>
    );
}
