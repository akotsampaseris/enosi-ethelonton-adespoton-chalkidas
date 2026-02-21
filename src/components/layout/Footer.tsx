import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";

const navigation = {
    adopt: [
        { name: "Διαθέσιμα Ζώα", href: "/animals" },
        { name: "Διαδικασία Υιοθεσίας", href: "/adopt/process" },
        { name: "Ιστορίες Υιοθεσίας", href: "/stories" },
        // { name: "Συχνές Ερωτήσεις", href: "/faq" },
    ],
    support: [
        { name: "Δωρεές", href: "/donate" },
        { name: "Γίνε Εθελοντής", href: "/volunteer" },
        { name: "Φιλοξένησε ένα ζώο", href: "/foster" },
        // { name: "Γίνε χορηγός ενός ζώου", href: "/sponsor" },
    ],
    about: [
        { name: "Η Αποστολή μας", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Social", href: "/social" },
    ],
    help: [
        { name: "Συχνές Ερωτήσεις", href: "/faq" },
        { name: "Επικοινωνία", href: "/contact" },
        { name: "Όροι & Προϋποθέσεις", href: "/terms" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>

            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-4">
                            <Image src="/logo.png" alt="Animal Rights Volunteer Group" width={150} height={150} className="h-24 w-auto mix-blend-difference" />
                        </Link>
                        <div>
                            <h3 className="text-xl text-white font-semibold leading-7 sm:text-inde">Ένωση Εθελοντών Αδέσποτων Χαλκίδας</h3>
                            <p className="text-sm leading-6 text-gray-300">
                                Διασώζουμε, φροντίζουμε και βρίσκουμε ένα σπίτι για τα αδέσποτα ζώα στον δήμο μας. Σε κάθε ζώο αξίζει ένα ζεστό σπίτι.
                            </p>
                        </div>

                        {/* Contact info */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a href="tel:+302101234567" className="hover:text-white transition">
                                    +30 210 210 2100
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:info@animalrescue.gr" className="hover:text-white transition">
                                    info@animalrescue.gr
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>Χαλκίδα, Ελλάδα</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex gap-4">
                            <a href="https://facebook.com/ethelontesadespotwnchalkidas" className="text-gray-400 hover:text-pink-500 transition">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="https://instagram.com/enosi_ethel_adespoton_chalkida" className="text-gray-400 hover:text-pink-500 transition">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Υιοθέτησε</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.adopt.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Στηρίξτε μας</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">Σχετικά με εμάς</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.about.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">Χρήσιμοι Σύνδεσμοι</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.help.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <p className="text-xs leading-5 text-gray-400">© {new Date().getFullYear()} Ένωση Εθελοντών Αδέσποτων Χαλκίδας. All rights reserved.</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            Made with <Heart className="h-3 w-3 fill-pink-500 text-pink-500" /> for animals by
                            <Link href="https://negativeentropy.me" target="_blank" className="text-blue-500 hover:text-pink-500">
                                negativeentropy.me
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
