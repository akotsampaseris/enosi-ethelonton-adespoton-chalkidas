import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, FileText, Home, Heart, PenTool, CheckCircle, Clock, Info } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function AdoptionProcessPage() {
    const steps = [
        {
            number: 1,
            icon: Search,
            title: "Βρες το Κατοικίδιό σου",
            description: "Περιηγήσου στα διαθέσιμα ζωάκια μας και βρες αυτό που ταιριάζει στον τρόπο ζωής σου.",
            duration: "30 λεπτά - μερικές μέρες",
            action: "Δες τα ζωάκια μας",
            link: "/animals",
        },
        {
            number: 2,
            icon: FileText,
            title: "Συμπλήρωσε Αίτηση",
            description: "Συμπλήρωσε την αίτηση υιοθεσίας με πληροφορίες για εσένα και το σπίτι σου.",
            duration: "10-15 λεπτά",
            action: "Συμπλήρωσε αίτηση",
            link: "/adopt",
        },
        {
            number: 3,
            icon: Home,
            title: "Επίσκεψη στο Σπίτι",
            description: "Κανονίζουμε μια φιλική επίσκεψη για να γνωριστούμε και να δούμε το περιβάλλον του ζώου.",
            duration: "1-2 εβδομάδες μετά την αίτηση",
        },
        {
            number: 4,
            icon: Heart,
            title: "Γνωριμία με το Ζώο",
            description: "Επισκέπτεσαι το καταφύγιο για να γνωρίσεις το ζώο και να δεις αν υπάρχει chemistry.",
            duration: "1-2 ώρες",
        },
        {
            number: 5,
            icon: PenTool,
            title: "Υπογραφή Συμβολαίου",
            description: "Υπογράφουμε το συμβόλαιο υιοθεσίας που διασφαλίζει την ευημερία του ζώου.",
            duration: "30 λεπτά",
        },
        {
            number: 6,
            icon: CheckCircle,
            title: "Καλωσόρισε τον νέο σου φίλο!",
            description: "Παίρνεις το νέο σου φίλο σπίτι και ξεκινά η περιπέτεια σας μαζί!",
            duration: "Για πάντα ❤️",
        },
    ];

    const requirements = [
        "Να είσαι άνω των 21 ετών",
        "Να έχεις σταθερή κατοικία",
        "Να έχεις τη συγκατάθεση όλων των ενοίκων του σπιτιού",
        "Να μπορείς να καλύψεις τα έξοδα φροντίδας του ζώου",
        "Να είσαι διατεθειμένος/η για δέσμευση πολλών ετών",
    ];

    const fees = [
        {
            item: "Τέλος Υιοθεσίας",
            price: "0€",
            description: "Καλύπτει μέρος των εξόδων στείρωσης και εμβολιασμού",
        },
        {
            item: "Εμβόλια & Μικροτσίπ",
            price: "Περιλαμβάνονται",
            description: "Όλα τα ζώα είναι εμβολιασμένα και έχουν μικροτσίπ",
        },
        {
            item: "Στείρωση",
            price: "Περιλαμβάνεται",
            description: "Τα περισσότερα ζώα είναι ήδη στειρωμένα",
        },
    ];

    const whatToExpect = [
        {
            title: "Κατά την Επίσκεψη στο Σπίτι",
            items: [
                "Διάρκεια: 30-60 λεπτά",
                "Φιλική και χαλαρή ατμόσφαιρα",
                "Δείχνουμε που θα μένει το ζώο",
                "Συζητάμε για την ασφάλεια του χώρου",
                "Απαντάμε σε όλες τις ερωτήσεις σου",
            ],
        },
        {
            title: "Μετά την Υιοθεσία",
            items: [
                "Follow-up τηλεφώνημα μετά από 1 εβδομάδα",
                "Επίσκεψη μετά από 1 μήνα (προαιρετική)",
                "Διαθέσιμοι για συμβουλές όποτε χρειαστείς",
                "Υποστήριξη για τη μεταβατική περίοδο",
                "Βοήθεια σε περίπτωση προβλημάτων συμπεριφοράς",
            ],
        },
    ];

    return (
        <PageLayout>
            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20">
                    <div className="container mx-auto max-w-6xl px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Διαδικασία Υιοθεσίας</h1>
                        <p className="text-xl text-pink-100 max-w-2xl mx-auto">Μάθε πώς μπορείς να υιοθετήσεις το νέο σου καλύτερο φίλο σε 6 απλά βήματα</p>
                    </div>
                </section>

                {/* Steps - Clean Timeline */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-5xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Η Διαδικασία σε 6 Βήματα</h2>
                            <p className="text-xl text-gray-600">Από την πρώτη γνωριμία μέχρι το νέο σας σπίτι</p>
                        </div>

                        <div className="relative">
                            <div className="space-y-0">
                                {steps.map((step, index) => (
                                    <div key={step.number} className="relative pb-20 last:pb-0">
                                        <div className="flex gap-2 md:gap-4 items-center">
                                            {/* Timeline Dot & Line */}
                                            <div className="relative flex flex-col items-center flex-shrink-0">
                                                {/* Connecting Line Above */}
                                                {index > 0 && <div className="w-0.5 bg-pink-300 h-65 -mt-65 mb-0" />}

                                                {/* Circle */}
                                                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg z-10">
                                                    <span className="text-white font-bold text-lg md:text-2xl">{step.number}</span>
                                                </div>

                                                {/* Connecting Line Below */}
                                                {index < steps.length - 1 && <div className="w-0.5 bg-pink-300 flex-1 mt-0" />}
                                            </div>

                                            {/* Content Card */}
                                            <div className="flex-1 bg-white rounded-2xl py-4 px-4 md:px-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-200 -mt-2">
                                                <div className="flex items-start gap-2 mb-2">
                                                    <div className="bg-pink-50 rounded-lg p-2">
                                                        <step.icon className="text-pink-600" size={20} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{step.description}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pl-6 sm:pl-10 pt-2 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Clock size={14} className="text-pink-500" />
                                                        <span>{step.duration}</span>
                                                    </div>

                                                    {step.action && step.link && (
                                                        <Button asChild variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                                                            <Link href={step.link}>{step.action}</Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Requirements & Fees */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Requirements */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Προϋποθέσεις</h2>
                                <ul className="space-y-4">
                                    {requirements.map((req) => (
                                        <li key={req} className="flex items-start gap-3">
                                            <CheckCircle className="text-pink-500 flex-shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Fees */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">Κόστος</h2>
                                <div className="space-y-6">
                                    {fees.map((fee) => (
                                        <div key={fee.item}>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900">{fee.item}</h3>
                                                <span className="text-pink-600 font-bold">{fee.price}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{fee.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                                        <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <p className="text-sm text-blue-800">
                                            Το κόστος υιοθεσίας βοηθά να καλύψουμε μέρος των εξόδων φροντίδας και να συνεχίσουμε να σώζουμε περισσότερα ζώα.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What to Expect */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Τι να Περιμένεις</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {whatToExpect.map((section) => (
                                <div key={section.title} className="bg-gray-50 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h3>
                                    <ul className="space-y-3">
                                        {section.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <div className="bg-pink-500 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Έτοιμος/η να Υιοθετήσεις;</h2>
                            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">Ξεκίνα τη διαδικασία σήμερα και δώσε σε ένα ζώο το σπίτι που του αξίζει</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-100 font-semibold" asChild>
                                    <Link href="/animals">Δες τα Ζωάκια</Link>
                                </Button>
                                <Button size="lg" variant="ghost" className="border-2 border-white text-white hover:bg-white/10 hover:border-pink-100" asChild>
                                    <Link href="/faq">Ερωτήσεις;</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
