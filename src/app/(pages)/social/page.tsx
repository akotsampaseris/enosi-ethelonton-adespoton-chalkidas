"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Share2, Copy, Heart, Check } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";

export default function SocialPage() {
    const socialLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            url: "https://facebook.com/ethelontesadespotwnchalkidas",
            handle: "@ethelontesadespotwnchalkidas",
            color: "bg-blue-600 hover:bg-blue-700",
            followers: "14K",
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://instagram.com/enosi_ethel_adespoton_chalkidas",
            handle: "@enosi_ethel_adespoton_chalkidas",
            color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
            followers: "84",
        },
    ];

    const baseUrl = window.location.origin;

    const shareMessages = [
        {
            title: "Για την Οργάνωση",
            message: `🐾 Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας σώζει ζωές κάθε μέρα! Βοηθήστε μας να βρούμε σπίτια για αδέσποτα ζώα. Δείτε τα διαθέσιμα ζωάκια: ${baseUrl}/animals`,
        },
        {
            title: "Για Υιοθεσία",
            message: `❤️ Ψάχνεις για έναν πιστό φίλο; Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας έχει πολλά υπέροχα ζωάκια που περιμένουν το παντοτινό τους σπίτι! 🏡 ${baseUrl}/animals`,
        },
        {
            title: "Για Εθελοντισμό",
            message: `🙌 Γίνε εθελοντής και κάνε τη διαφορά! Η Ένωση Εθελοντών Αδέσποτων Χαλκίδας χρειάζεται τη βοήθειά σου. Κάθε ώρα μετράει! ${baseUrl}/volunteer`,
        },
        {
            title: "Για Δωρεές",
            message: `💝 Κάθε δωρεά σώζει ζωές! Στήριξε το έργο της Ένωσης Εθελοντών Αδέσποτων Χαλκίδας και βοήθησε τα αδέσποτα ζώα της περιοχής μας. ${baseUrl}/donate`,
        },
    ];

    const hashtags = [
        "#ΕνωσηΕθελοντώνΑδέσποτωνΧαλκίδας",
        "#ΥιοθεσίαΖώων",
        "#ΑδέσποταΖώα",
        "#Χαλκίδα",
        "#AdoptDontShop",
        "#ΠροστασίαΖώων",
        "#RescueDogs",
        "#RescueCats",
        "#ΕθελοντισμόςΖώων",
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <section className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96">
                        <Share2 className="w-full h-full" />
                    </div>
                </div>

                <div className="container mx-auto max-w-6xl px-4 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Διάδωσε το Μήνυμα</h1>
                        <p className="text-xl md:text-2xl text-pink-100 leading-relaxed">Μοιράσου την αποστολή μας και βοήθησε περισσότερα ζώα να βρουν σπίτι</p>
                    </motion.div>
                </div>
            </section>

            {/* Follow Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ακολούθησέ μας</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Μείνε ενημερωμένος/η για νέα ζωάκια, υιοθεσίες και εκδηλώσεις</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group">
                                <div className="bg-white rounded-3xl border-2 border-gray-200 hover:border-pink-300 hover:shadow-2xl transition-all p-8">
                                    <div className="flex items-center gap-6 mb-6">
                                        <div className={`${social.color} rounded-2xl p-4 text-white`}>
                                            <social.icon size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">{social.name}</h3>
                                            <p className="text-gray-600">{social.handle}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-3xl font-bold text-pink-600">{social.followers}</p>
                                        <p className="text-gray-600">Ακόλουθοι</p>
                                    </div>

                                    <Button className={`w-full ${social.color} text-white border-0`}>Ακολούθησε</Button>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Share Messages */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Έτοιμα Μηνύματα για Κοινοποίηση</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Αντέγραψε και μοίρασε στα social media σου</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {shareMessages.map((item, index) => (
                            <ShareMessageCard key={index} {...item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Hashtags */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Χρήσιμα Hashtags</h2>
                        <p className="text-xl text-gray-600">Χρησιμοποίησε αυτά τα hashtags για να μας βοηθήσεις να φτάσουμε σε περισσότερο κόσμο</p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {hashtags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-white px-4 py-2 rounded-full text-pink-600 font-medium border border-pink-200 hover:bg-pink-50 transition-colors cursor-pointer"
                                    onClick={() => {
                                        navigator.clipboard.writeText(tag);
                                    }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-6">💡 Κλικ σε ένα hashtag για να το αντιγράψεις</p>
                    </div>
                </div>
            </section>

            {/* Why Share */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Γιατί η κοινοποίηση βοηθάει;</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Περισσότερες Υιοθεσίες",
                                        description: "Όσο περισσότεροι βλέπουν τα ζωάκια μας, τόσο περισσότερες ευκαιρίες έχουν να βρουν σπίτι.",
                                    },
                                    {
                                        title: "Περισσότεροι Εθελοντές",
                                        description: "Κάθε κοινοποίηση μπορεί να φέρει νέους εθελοντές που θα μας βοηθήσουν.",
                                    },
                                    {
                                        title: "Περισσότερες Δωρεές",
                                        description: "Η ευαισθητοποίηση οδηγεί σε περισσότερη υποστήριξη για το έργο μας.",
                                    },
                                    {
                                        title: "Ευαισθητοποίηση",
                                        description: "Μαζί αλλάζουμε νοοτροπίες για την προστασία των αδέσποτων ζώων.",
                                    },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200">
                                        <Heart className="text-pink-500 flex-shrink-0 mt-1" size={24} />
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                                            <p className="text-gray-700 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <Image src="/images/socials.jpeg" alt="Κοινοποίηση στα social media" fill className="object-cover" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Κάθε Κοινοποίηση Μετράει</h2>
                        <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                            Ευχαριστούμε που μας βοηθάς να φτάσουμε σε περισσότερο κόσμο και να σώσουμε περισσότερες ζωές
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <ShareButton
                                title="Ένωση Εθελοντών Αδέσποτων Χαλκίδας"
                                text="Σώζουμε ζωές, ένα ζώο τη φορά. Βοηθήστε μας να βρούμε σπίτια για αδέσποτα ζώα!"
                                className="inline-flex items-center gap-2 bg-white text-pink-600 hover:bg-pink-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                                showLabel={true}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Share Message Card Component
function ShareMessageCard({ title, message }: { title: string; message: string }) {
    const [copied, setCopied] = useState(false);

    const copyMessage = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-pink-300 hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 min-h-[100px] relative">
                <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
            </div>
            <Button onClick={copyMessage} className={`w-full ${copied ? "bg-green-500 hover:bg-green-600" : "bg-pink-500 hover:bg-pink-600"}`}>
                {copied ? (
                    <>
                        <Check className="mr-2" size={18} />
                        Αντιγράφηκε!
                    </>
                ) : (
                    <>
                        <Copy className="mr-2" size={18} />
                        Αντιγραφή
                    </>
                )}
            </Button>
        </div>
    );
}
