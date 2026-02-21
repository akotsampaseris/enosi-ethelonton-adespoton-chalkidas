"use client";

import { useState, useEffect, useEffectEvent } from "react";
import { ChevronDown, FileText, Home, Heart, Users, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function TermsPage() {
    const [openSection, setOpenSection] = useState("general");

    const openSectionByHash = useEffectEvent((hash: string) => {
        setOpenSection(hash);
    });

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            openSectionByHash(hash);
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 150;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }, 100);
        }
    }, []);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? "" : section);
    };

    const termsData = [
        {
            id: "general",
            icon: FileText,
            title: "Γενικοί Όροι & Προϋποθέσεις",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. Αποδοχή Όρων</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Με την πρόσβαση και τη χρήση αυτού του ιστότοπου, αποδέχεστε και συμφωνείτε να δεσμεύεστε από τους όρους και τις προϋποθέσεις που περιγράφονται εδώ.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Χρήση του Ιστότοπου</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Αυτός ο ιστότοπος παρέχεται για πληροφοριακούς σκοπούς σχετικά με την οργάνωσή μας και τις δραστηριότητές μας διάσωσης ζώων. Συμφωνείτε να
                            χρησιμοποιείτε τον ιστότοπο μόνο για νόμιμους σκοπούς.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Να μην παραβιάζετε νόμους ή κανονισμούς</li>
                            <li>Να μην μεταδίδετε κακόβουλο λογισμικό ή άλλο επιβλαβές περιεχόμενο</li>
                            <li>Να μην παρενοχλείτε ή βλάπτετε άλλους χρήστες</li>
                            <li>Να μην παραποιείτε την ταυτότητά σας</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">3. Πνευματικά Δικαιώματα</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Όλο το περιεχόμενο αυτού του ιστότοπου, συμπεριλαμβανομένων κειμένων, εικόνων, λογότυπων και γραφικών, είναι ιδιοκτησία της Ένωσης Εθελοντών Αδέσποτων
                            Χαλκίδας και προστατεύεται από τους νόμους πνευματικής ιδιοκτησίας.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">4. Απόρριψη Εγγυήσεων</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Ο ιστότοπος παρέχεται &quot;ως έχει&quot; χωρίς καμία εγγύηση οποιουδήποτε είδους. Δεν εγγυόμαστε ότι ο ιστότοπος θα είναι διαθέσιμος χωρίς διακοπές ή
                            ότι θα είναι απαλλαγμένος από σφάλματα.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">5. Περιορισμός Ευθύνης</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Η οργάνωσή μας δεν φέρει ευθύνη για τυχόν ζημίες που προκύπτουν από τη χρήση ή την αδυναμία χρήσης του ιστότοπου, συμπεριλαμβανομένων ζημιών που
                            προκύπτουν από ιούς που μπορεί να μολύνουν τον υπολογιστή σας.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">6. Τροποποιήσεις</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Διατηρούμε το δικαίωμα να τροποποιούμε αυτούς τους όρους ανά πάσα στιγμή. Οι αλλαγές θα τεθούν σε ισχύ αμέσως μετά τη δημοσίευσή τους σε αυτόν τον
                            ιστότοπο.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">7. Επικοινωνία</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Για ερωτήσεις σχετικά με αυτούς τους όρους, επικοινωνήστε μαζί μας στο{" "}
                            <Link href="/contact" className="text-pink-600 hover:text-pink-700 underline">
                                info@animalrescue.gr
                            </Link>
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "adoption",
            icon: Home,
            title: "Όροι Υιοθεσίας",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. Διαδικασία Υιοθεσίας</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Η υιοθεσία ενός ζώου από την οργάνωσή μας περιλαμβάνει αίτηση, επίσκεψη στο σπίτι, γνωριμία με το ζώο και υπογραφή συμβολαίου υιοθεσίας.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Υποχρεώσεις Υιοθέτη</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Να παρέχετε κατάλληλη στέγη, τροφή και νερό</li>
                            <li>Να διασφαλίζετε κτηνιατρική φροντίδα όταν χρειάζεται</li>
                            <li>Να διατηρείτε το ζώο στειρωμένο/ευνουχισμένο</li>
                            <li>Να μην εγκαταλείπετε ή κακομεταχειρίζεστε το ζώο</li>
                            <li>Να ειδοποιείτε την οργάνωση σε περίπτωση αλλαγής διεύθυνσης</li>
                            <li>Να επιστρέφετε το ζώο στην οργάνωση αν δεν μπορείτε να το κρατήσετε</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">3. Τέλος Υιοθεσίας</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Το τέλος υιοθεσίας (50-100€) καλύπτει μέρος των εξόδων για στείρωση, εμβόλια, μικροτσίπ και κτηνιατρική φροντίδα. Το τέλος δεν επιστρέφεται.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">4. Περίοδος Προσαρμογής</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Παρέχουμε υποστήριξη κατά την περίοδο προσαρμογής. Αν προκύψουν σοβαρά προβλήματα συμπεριφοράς εντός των πρώτων 2 εβδομάδων, μπορούμε να συζητήσουμε
                            εναλλακτικές λύσεις.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">5. Επισκέψεις Follow-up</h3>
                        <p className="text-gray-700 leading-relaxed">Διατηρούμε το δικαίωμα να πραγματοποιούμε επισκέψεις follow-up για να διασφαλίσουμε την ευημερία του ζώου.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">6. Επιστροφή Ζώου</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Αν για οποιονδήποτε λόγο δεν μπορείτε να κρατήσετε το ζώο, πρέπει να επικοινωνήσετε μαζί μας. Το ζώο πρέπει να επιστραφεί στην οργάνωση - δεν
                            επιτρέπεται η μεταβίβαση σε τρίτους χωρίς την έγκρισή μας.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "foster",
            icon: Heart,
            title: "Όροι Φιλοξενίας",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. Ρόλος Φιλοξενίας</h3>
                        <p className="text-gray-700 leading-relaxed">Η φιλοξενία είναι προσωρινή φροντίδα ενός ζώου μέχρι να βρεθεί μόνιμο σπίτι. Δεν αποτελεί υιοθεσία.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Υποχρεώσεις Φιλοξενίας</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Να παρέχετε ασφαλές και καθαρό περιβάλλον</li>
                            <li>Να προσφέρετε αγάπη, φροντίδα και κοινωνικοποίηση</li>
                            <li>Να ακολουθείτε τις οδηγίες για τη φροντίδα του ζώου</li>
                            <li>Να ενημερώνετε την οργάνωση για την πρόοδο του ζώου</li>
                            <li>Να διευκολύνετε επισκέψεις υποψήφιων υιοθετών</li>
                            <li>Να επιστρέφετε το ζώο όταν βρεθεί μόνιμο σπίτι</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">3. Κάλυψη Εξόδων</h3>
                        <p className="text-gray-700 leading-relaxed">Η οργάνωση καλύπτει:</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                            <li>Κτηνιατρική φροντίδα (με προέγκριση)</li>
                            <li>Τροφή (με συντονισμό)</li>
                            <li>Φάρμακα και απαραίτητες προμήθειες</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-3">Ο φιλοξενητής καλύπτει: Καθημερινά αναλώσιμα (π.χ. απορροφητικές πάνες) και προαιρετικά αξεσουάρ.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">4. Διάρκεια Φιλοξενίας</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Η διάρκεια φιλοξενίας ποικίλλει ανάλογα με το ζώο. Μπορεί να διαρκέσει από λίγες εβδομάδες έως μερικούς μήνες. Θα σας ενημερώνουμε για την πρόοδο της
                            εύρεσης μόνιμου σπιτιού.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">5. Έκτακτες Ανάγκες</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Σε περίπτωση έκτακτης κτηνιατρικής ανάγκης, επικοινωνήστε αμέσως με την οργάνωση. Μην προχωρήσετε σε θεραπεία χωρίς έγκριση, εκτός αν είναι απειλητική
                            για τη ζωή.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">6. Υιοθεσία από Φιλοξενητή</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Αν επιθυμείτε να υιοθετήσετε το ζώο που φιλοξενείτε (&quot;foster to adopt&quot;), ενημερώστε μας. Θα ακολουθήσουμε τη συνήθη διαδικασία υιοθεσίας.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">7. Τερματισμός Φιλοξενίας</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Αν χρειαστεί να τερματίσετε τη φιλοξενία νωρίτερα από το αναμενόμενο, παρακαλούμε δώστε μας εύλογη προειδοποίηση (τουλάχιστον 1 εβδομάδα) ώστε να βρούμε
                            εναλλακτική λύση για το ζώο.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            id: "volunteer",
            icon: Users,
            title: "Όροι Εθελοντισμού",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">1. Δέσμευση Εθελοντισμού</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Ως εθελοντής, συμφωνείτε να αφιερώσετε τον συμφωνημένο χρόνο και να συμμετέχετε στις εργασίες που σας έχουν ανατεθεί με συνέπεια και υπευθυνότητα.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">2. Κώδικας Δεοντολογίας</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li>Να σέβεστε όλα τα ζώα και τους συνεθελοντές</li>
                            <li>Να ακολουθείτε τις οδηγίες και πρωτόκολλα της οργάνωσης</li>
                            <li>Να διατηρείτε εμπιστευτικότητα σχετικά με ευαίσθητες πληροφορίες</li>
                            <li>Να αναφέρετε τυχόν προβλήματα ή ανησυχίες στον συντονιστή</li>
                            <li>Να μην ενεργείτε εκ μέρους της οργάνωσης χωρίς εξουσιοδότηση</li>
                            <li>Να μην διαδίδετε αρνητικές πληροφορίες για την οργάνωση</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">3. Εκπαίδευση</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Πριν ξεκινήσετε τον εθελοντισμό, θα λάβετε κατάλληλη εκπαίδευση για τον ρόλο σας. Είστε υπεύθυνοι να παρακολουθείτε τυχόν πρόσθετες εκπαιδεύσεις που
                            ζητούνται.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">4. Ασφάλεια</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Η ασφάλειά σας και των ζώων είναι προτεραιότητα. Πρέπει να ακολουθείτε όλες τις οδηγίες ασφαλείας και να χρησιμοποιείτε τον κατάλληλο εξοπλισμό. Αν δεν
                            αισθάνεστε άνετα με μια εργασία, ενημερώστε μας.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">5. Απουσίες</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Αν δεν μπορείτε να προσέλθετε σε προγραμματισμένη εθελοντική εργασία, παρακαλούμε ειδοποιήστε μας το συντομότερο δυνατό.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">6. Αποζημίωση</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Ο εθελοντισμός είναι μη αμειβόμενος. Ωστόσο, ορισμένα έξοδα που προκύπτουν κατά την εκτέλεση των καθηκόντων σας μπορεί να επιστραφούν με προέγκριση.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">7. Ασφάλιση</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Ενώ λαμβάνουμε προφυλάξεις για την ασφάλεια, η οργάνωση δεν φέρει ευθύνη για τραυματισμούς που προκύπτουν κατά τη διάρκεια των εθελοντικών
                            δραστηριοτήτων. Συνιστούμε να έχετε την προσωπική σας ασφάλιση.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">8. Τερματισμός Εθελοντισμού</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Είτε εσείς είτε η οργάνωση μπορεί να τερματίσει την εθελοντική σχέση ανά πάσα στιγμή. Διατηρούμε το δικαίωμα να αφαιρέσουμε εθελοντές που δεν τηρούν
                            τους όρους ή την πολιτική μας.
                        </p>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <PageLayout>
            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20">
                    <div className="container mx-auto max-w-4xl px-4 text-center">
                        <Shield className="w-16 h-16 mx-auto mb-6" />
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Όροι & Προϋποθέσεις</h1>
                        <p className="text-xl text-pink-100">Διαβάστε τους όρους που διέπουν τις υπηρεσίες και τις δραστηριότητές μας</p>
                    </div>
                </section>

                {/* Terms Accordion */}
                <section className="py-20">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="space-y-4">
                            {termsData.map((section) => (
                                <div key={section.id} id={section.id} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-pink-100 rounded-full p-3">
                                                <section.icon className="text-pink-600" size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                                        </div>
                                        <ChevronDown className={`flex-shrink-0 text-pink-500 transition-transform ${openSection === section.id ? "rotate-180" : ""}`} size={28} />
                                    </button>

                                    <AnimatePresence>
                                        {openSection === section.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden">
                                                <div className="px-6 pb-6 pt-0">
                                                    <div className="prose max-w-none">{section.content}</div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {/* Last Updated */}
                        <div className="mt-12 text-center text-sm text-gray-500">Τελευταία ενημέρωση: 21 Φεβρουαρίου 2026</div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Έχετε Ερωτήσεις;</h2>
                            <p className="text-xl text-gray-600 mb-8">Αν έχετε οποιαδήποτε ερώτηση σχετικά με τους όρους μας, επικοινωνήστε μαζί μας</p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors">
                                Επικοινωνία
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}
