"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Copy, Heart, Package, PawPrint, Gift, CheckCircle } from "lucide-react";
import PageLayout from "@/components/ui/PageLayout";

export default function Donate() {
    const otherWays = [
        {
            icon: Package,
            title: "Είδη Πρώτης Ανάγκης",
            description: "Τροφές για σκύλους και γάτες, απορροφητικές πάνες, κλουβιά μεταφοράς",
        },
        {
            icon: Gift,
            title: "Είδη Φροντίδας",
            description: "Παιχνίδια, κουβέρτες, μαξιλάρια, λουριά, κολάρα",
        },
        {
            icon: Heart,
            title: "Νοσηλεία Ζώου",
            description: "Βοηθήστε μας να καλύψουμε τα έξοδά θεραπείας ενός ζώου",
        },
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
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">Στηρίξτε το Έργο μας</h1>
                            <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">Κάθε δωρεά, ανεξαρτήτως ποσού, κάνει τη διαφορά στη ζωή ενός αδέσποτου ζώου</p>
                        </motion.div>
                    </div>
                </section>

                {/* Why Donate */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                    <Image src="/images/rescued-animals.jpeg" alt="Διασωθέντα ζώα" fill className="object-cover" />
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Γιατί χρειαζόμαστε τη βοήθειά σας;</h2>
                                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                    Σώζουμε, φροντίζουμε και βρίσκουμε σπίτια για εκατοντάδες αδέσποτα ζώα κάθε χρόνο. Κάθε ζώο που διασώζουμε χρειάζεται:
                                </p>
                                <ul className="space-y-4 mb-6">
                                    {[
                                        "Κτηνιατρική εξέταση και φροντίδα",
                                        "Εμβόλια, στείρωση και μικροτσίπ",
                                        "Τροφή και καταφύγιο",
                                        "Θεραπεία τραυματισμών και ασθενειών",
                                        "Φιλοξενία μέχρι την υιοθεσία",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <CheckCircle className="text-pink-500 flex-shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    Χωρίς τη γενναιοδωρία των δωρητών μας, δεν θα μπορούσαμε να συνεχίσουμε αυτό το σημαντικό έργο.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Donation Methods */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Τρόποι Δωρεάς</h2>
                            <p className="text-xl text-gray-600">Επιλέξτε τον τρόπο που σας εξυπηρετεί καλύτερα</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl p-8 border-2 transition-all border-pink-300 hover:shadow-2xl">
                                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                    <PawPrint className="text-pink-600" size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Pet Shop Γαβριελάτος Ιωάννης</h3>
                                <p className="text-gray-600 mb-6 font-medium">Κατάθεση στον τραπεζικό λογαριασμό της επιχείρησης</p>
                                <div className="text-sm text-gray-700 space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">Τράπεζα</p>
                                        <p className="font-bold text-base">Τράπεζα Πειραιώς</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">IBAN</p>
                                        <CopyButton text="GR78017215400005154088012157">GR78 0172 1540 0051 5408 8012 157</CopyButton>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">Αναφορά στα σχόλια</p>
                                        <p className="font-bold text-base">Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border-2 transition-all border-pink-300 hover:shadow-2xl">
                                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                    <PawPrint className="text-pink-600" size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Pet Shop Γαβριελάτος Ιωάννης</h3>
                                <p className="text-gray-600 mb-6 font-medium">Κατάθεση στον τραπεζικό λογαριασμό της επιχείρησης</p>
                                <div className="text-sm text-gray-700 space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">Τράπεζα</p>
                                        <p className="font-bold text-base">Εθνική Τράπεζα</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">IBAN</p>
                                        <CopyButton text="GR1501104880000048870086278">GR15 0110 4880 0000 4887 0086 278</CopyButton>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">Αναφορά στα σχόλια</p>
                                        <p className="font-bold text-base">Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border-2 transition-all border-pink-300 hover:shadow-2xl">
                                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                    <PawPrint className="text-pink-600" size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Κτηνιατρικά Φάρμακα - Pet Shop Ζαχαροπούλου Μαρία</h3>
                                <p className="text-gray-600 mb-6 font-medium">Κατάθεση στον τραπεζικό λογαριασμό της επιχείρησης</p>
                                <div className="text-sm text-gray-700 space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">Τράπεζα</p>
                                        <p className="font-bold text-base">Τράπεζα Πειραιώς</p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">IBAN</p>
                                        <CopyButton text=" GR4401721530005153100637609">GR44 0172 1530 0051 5310 0637 609</CopyButton>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">Αναφορά στα σχόλια</p>
                                        <p className="font-bold text-base">Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Ways to Help */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-6xl px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Άλλοι Τρόποι να Βοηθήσετε</h2>
                            <p className="text-xl text-gray-600">Δεν είναι μόνο τα χρήματα - κάθε συνεισφορά μετράει</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {otherWays.map((way) => (
                                <div key={way.title} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all">
                                    <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                                        <way.icon className="text-pink-600" size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{way.title}</h3>
                                    <p className="text-gray-700 leading-relaxed">{way.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Κάθε Συνεισφορά Μετράει</h2>
                            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                                Μαζί μπορούμε να σώσουμε περισσότερες ζωές και να δώσουμε σε κάθε ζώο το σπίτι που του αξίζει
                            </p>
                            <p className="text-2xl font-bold">Ευχαριστούμε για την υποστήριξή σας! ❤️</p>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}

interface CopyButtonProps {
    text: string;
    children?: React.ReactNode;
}

export function CopyButton({ text, children }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button onClick={copyToClipboard} className="font-bold flex gap-2 items-center hover:text-pink-600 transition-colors text-left">
            {copied ? (
                <>
                    <Check size={14} className="text-green-600" />
                    <span className="text-green-600">Αντιγράφηκε!</span>
                </>
            ) : (
                <>
                    <Copy size={14} />
                    {children || text}
                </>
            )}
        </button>
    );
}
