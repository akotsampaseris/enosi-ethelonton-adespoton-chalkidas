"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Heart,
    Building2,
    CreditCard,
    Smartphone,
    Package,
    Gift,
    FileText,
    CheckCircle,
    Info,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function DonatePage() {
    const donationMethods = [
        {
            icon: Building2,
            title: "Τραπεζική Κατάθεση",
            description: "Κατάθεση στον τραπεζικό λογαριασμό της οργάνωσης",
            details: [
                "Τράπεζα: Alpha Bank",
                "IBAN: GR16 0140 1234 1234 1234 1234 567",
                "Δικαιούχος: Ένωση Εθελοντών Αδέσποτων Χαλκίδας",
            ],
        },
        {
            icon: CreditCard,
            title: "Κάρτα (Σύντομα)",
            description: "Online πληρωμή με πιστωτική ή χρεωστική κάρτα",
            comingSoon: true,
        },
        {
            icon: Smartphone,
            title: "PayPal (Σύντομα)",
            description: "Γρήγορη και ασφαλής δωρεά μέσω PayPal",
            comingSoon: true,
        },
    ];

    const otherWays = [
        {
            icon: Package,
            title: "Είδη Πρώτης Ανάγκης",
            description:
                "Τροφές για σκύλους και γάτες, απορροφητικές πάνες, κλουβιά μεταφοράς",
        },
        {
            icon: Gift,
            title: "Είδη Φροντίδας",
            description: "Παιχνίδια, κουβέρτες, μαξιλάρια, λουριά, κολάρα",
        },
        {
            icon: Heart,
            title: "Χορηγία Ζώου",
            description:
                "Υιοθετήστε εξ αποστάσεως ένα ζώο καλύπτοντας τα έξοδά του",
        },
    ];

    const expenses = [
        { category: "Κτηνιατρική Φροντίδα", percentage: 45 },
        { category: "Τροφές & Προμήθειες", percentage: 30 },
        { category: "Φιλοξενία & Καταφύγια", percentage: 15 },
        { category: "Διαχείριση & Λειτουργία", percentage: 10 },
    ];

    const impacts = [
        { amount: "20€", description: "Εμβόλια για 1 ζώο" },
        { amount: "50€", description: "Στείρωση 1 γάτας" },
        { amount: "100€", description: "Πλήρης κτηνιατρική εξέταση" },
        { amount: "200€", description: "Ένας μήνας φροντίδας για 1 ζώο" },
    ];

    return (
        <PageLayout>
            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute bottom-0 left-0 w-96 h-96">
                            <Heart className="w-full h-full" />
                        </div>
                    </div>

                    <div className="container mx-auto max-w-6xl px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Στηρίξτε το Έργο μας
                            </h1>
                            <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">
                                Κάθε δωρεά, ανεξαρτήτως ποσού, κάνει τη διαφορά
                                στη ζωή ενός αδέσποτου ζώου
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Why Donate */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/images/rescued-animals.jpeg"
                                        alt="Διασωθέντα ζώα"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Γιατί χρειαζόμαστε τη βοήθειά σας;
                                </h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    Σώζουμε, φροντίζουμε και βρίσκουμε σπίτια
                                    για εκατοντάδες αδέσποτα ζώα κάθε χρόνο.
                                    Κάθε ζώο που διασώζουμε χρειάζεται:
                                </p>
                                <ul className="space-y-4 mb-6">
                                    {[
                                        "Κτηνιατρική εξέταση και φροντίδα",
                                        "Εμβόλια, στείρωση και μικροτσίπ",
                                        "Τροφή και καταφύγιο",
                                        "Θεραπεία τραυματισμών και ασθενειών",
                                        "Φιλοξενία μέχρι την υιοθεσία",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle
                                                className="text-pink-500 flex-shrink-0 mt-1"
                                                size={20}
                                            />
                                            <span className="text-gray-700">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Χωρίς τη γενναιοδωρία των δωρητών μας, δεν
                                    θα μπορούσαμε να συνεχίσουμε αυτό το
                                    σημαντικό έργο.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Impact */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Η Επίδραση της Δωρεάς σας
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Δείτε πώς η συνεισφορά σας κάνει πραγματική
                                διαφορά
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {impacts.map((impact) => (
                                <div
                                    key={impact.amount}
                                    className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all"
                                >
                                    <div className="text-4xl font-bold text-pink-600 mb-3">
                                        {impact.amount}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        {impact.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Donation Methods */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Τρόποι Δωρεάς
                            </h2>
                            <p className="text-xl text-gray-600">
                                Επιλέξτε τον τρόπο που σας εξυπηρετεί καλύτερα
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {donationMethods.map((method) => (
                                <div
                                    key={method.title}
                                    className={`bg-white rounded-2xl p-8 border-2 transition-all ${
                                        method.comingSoon
                                            ? "border-gray-200 opacity-60"
                                            : "border-pink-300 hover:shadow-2xl"
                                    }`}
                                >
                                    <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                        <method.icon
                                            className="text-pink-600"
                                            size={28}
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {method.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        {method.description}
                                    </p>
                                    {method.details && (
                                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                            {method.details.map((detail) => (
                                                <p
                                                    key={detail}
                                                    className="text-sm text-gray-700 font-mono"
                                                >
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    {method.comingSoon && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                                            <p className="text-sm font-semibold text-yellow-800">
                                                Σύντομα Διαθέσιμο
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
                            <Info
                                className="text-blue-600 flex-shrink-0 mt-1"
                                size={24}
                            />
                            <div>
                                <h4 className="font-bold text-blue-900 mb-2">
                                    Σημαντική Πληροφορία
                                </h4>
                                <p className="text-blue-800">
                                    Παρακαλούμε να συμπεριλάβετε το
                                    ονοματεπώνυμό σας ως αιτιολογία κατάθεσης
                                    για να μπορούμε να σας στείλουμε απόδειξη
                                    δωρεάς για φορολογικούς σκοπούς.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Ways to Help */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Άλλοι Τρόποι να Βοηθήσετε
                            </h2>
                            <p className="text-xl text-gray-600">
                                Δεν είναι μόνο το χρήμα - κάθε συνεισφορά
                                μετράει
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {otherWays.map((way) => (
                                <div
                                    key={way.title}
                                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all"
                                >
                                    <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                        <way.icon
                                            className="text-pink-600"
                                            size={28}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {way.title}
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {way.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Transparency */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Διαφάνεια & Λογοδοσία
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Πώς χρησιμοποιούμε τις δωρεές σας
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                    Κατανομή Εξόδων
                                </h3>
                                <div className="space-y-4">
                                    {expenses.map((expense) => (
                                        <div key={expense.category}>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold text-gray-900">
                                                    {expense.category}
                                                </span>
                                                <span className="text-pink-600 font-bold">
                                                    {expense.percentage}%
                                                </span>
                                            </div>
                                            <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                                <div
                                                    className="bg-pink-500 h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${expense.percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <FileText
                                        className="text-pink-600 flex-shrink-0"
                                        size={32}
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Ετήσιες Εκθέσεις
                                        </h3>
                                        <p className="text-gray-700 mb-4">
                                            Κάθε χρόνο δημοσιεύουμε αναλυτική
                                            έκθεση των εσόδων και εξόδων μας.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle
                                            className="text-green-500"
                                            size={24}
                                        />
                                        <span className="text-gray-700">
                                            100% μη κερδοσκοπική οργάνωση
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle
                                            className="text-green-500"
                                            size={24}
                                        />
                                        <span className="text-gray-700">
                                            Δημοσιοποίηση όλων των δαπανών
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle
                                            className="text-green-500"
                                            size={24}
                                        />
                                        <span className="text-gray-700">
                                            Απόδειξη για κάθε δωρεά
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Κάθε Συνεισφορά Μετράει
                            </h2>
                            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                                Μαζί μπορούμε να σώσουμε περισσότερες ζωές και
                                να δώσουμε σε κάθε ζώο το σπίτι που του αξίζει
                            </p>
                            <p className="text-2xl font-bold">
                                Ευχαριστούμε για την υποστήριξή σας! ❤️
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
