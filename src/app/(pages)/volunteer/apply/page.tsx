import VolunteerApplicationForm from "@/forms/VolunteerApplicationForm";
import PageLayout from "@/components/PageLayout";

import type { Metadata } from "next";
import { defaultMetadata } from "@/assets/metadata";

export const metadata: Metadata = {
    ...defaultMetadata,
    title: "Αίτηση Εθελοντισμού",
    description: "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.",
    openGraph: {
        ...defaultMetadata.openGraph,
        title: "Αίτηση Εθελοντισμού",
        description: "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.",
    },
    twitter: {
        ...defaultMetadata.twitter,
        title: "Αίτηση Εθελοντισμού",
        description: "Συμπλήρωσε την αίτηση εθελοντισμού και γίνε μέρος της ομάδας μας. Κάνε τη διαφορά στη ζωή των αδέσποτων ζώων.",
    },
};

export default function VolunteerApplicationPage() {
    return (
        <PageLayout>
            <VolunteerApplicationForm />
        </PageLayout>
    );
}
