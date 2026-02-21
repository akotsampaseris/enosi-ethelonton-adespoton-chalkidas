"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Calendar,
  Home,
  Stethoscope,
  Camera,
  Megaphone,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

export default function VolunteerPage() {
  const roles = [
    {
      icon: Home,
      title: "Φιλοξενία",
      description:
        "Προσφέρετε προσωρινό σπίτι σε ζώα που χρειάζονται φροντίδα μέχρι να βρουν μόνιμο σπίτι.",
    },
    {
      icon: Stethoscope,
      title: "Κτηνιατρική Υποστήριξη",
      description:
        "Βοηθήστε με ιατρικές επισκέψεις, φάρμακα και παρακολούθηση της υγείας των ζώων.",
    },
    {
      icon: Users,
      title: "Εκδηλώσεις & Υιοθεσίες",
      description:
        "Οργανώστε και συμμετέχετε σε εκδηλώσεις υιοθεσίας και ενημέρωσης του κοινού.",
    },
    {
      icon: Camera,
      title: "Φωτογραφία & Media",
      description:
        "Τραβήξτε φωτογραφίες και βίντεο των ζώων για να προβληθούν στα social media.",
    },
    {
      icon: Megaphone,
      title: "Επικοινωνία & Marketing",
      description:
        "Βοηθήστε στην προώθηση της αποστολής μας μέσω social media και επικοινωνίας.",
    },
    {
      icon: Calendar,
      title: "Διοικητική Υποστήριξη",
      description:
        "Βοηθήστε με γραφειοκρατικές εργασίες, οργάνωση και συντονισμό δραστηριοτήτων.",
    },
  ];

  const benefits = [
    {
      title: "Κάνετε Διαφορά",
      description:
        "Η συμβολή σας σώζει ζωές και βοηθά ζώα να βρουν το σπίτι τους.",
    },
    {
      title: "Γνωρίστε Ανθρώπους",
      description:
        "Γίνετε μέλος μιας κοινότητας με κοινά ιδανικά και φιλοζωική στάση.",
    },
    {
      title: "Μάθετε Νέα Πράγματα",
      description:
        "Αποκτήστε εμπειρία στη φροντίδα ζώων και την οργάνωση εθελοντικών δράσεων.",
    },
    {
      title: "Ευέλικτος Χρόνος",
      description: "Προσφέρετε όσο χρόνο μπορείτε, όποτε σας βολεύει.",
    },
  ];

  const requirements = [
    "Να είστε άνω των 18 ετών (ή με γονική συγκατάθεση)",
    "Αγάπη και σεβασμός για τα ζώα",
    "Υπευθυνότητα και αξιοπιστία",
    "Διαθεσιμότητα τουλάχιστον 2-3 ώρες την εβδομάδα",
    "Θετική στάση και πνεύμα συνεργασίας",
  ];

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96">
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
                Γίνε Εθελοντής
              </h1>
              <p className="text-xl md:text-2xl text-pink-100 mb-8 leading-relaxed">
                Ελάτε στην ομάδα μας και βοηθήστε να κάνουμε τη διαφορά στη ζωή
                των αδέσποτων ζώων
              </p>
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 font-semibold text-lg px-8 py-6"
                asChild
              >
                <Link href="/volunteer/apply">Γίνε Μέλος</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Volunteer */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Γιατί να γίνεις εθελοντής;
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Ο εθελοντισμός στην οργάνωσή μας σημαίνει ότι γίνεσαι μέρος
                  μιας αποστολής που αλλάζει ζωές. Κάθε ώρα που προσφέρεις, κάθε
                  χαμόγελο που χαρίζεις σε ένα διασωθέν ζώο, κάνει τη διαφορά.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Δεν χρειάζεται προηγούμενη εμπειρία - μόνο αγάπη για τα ζώα
                  και την επιθυμία να βοηθήσεις. Θα σε εκπαιδεύσουμε και θα σε
                  υποστηρίξουμε σε κάθε βήμα.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="bg-pink-50 rounded-xl p-4"
                    >
                      <h3 className="font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/volunteer.jpeg"
                    alt="Εθελοντές"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Volunteer Roles */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Πώς μπορείς να βοηθήσεις;
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Υπάρχουν πολλοί τρόποι να προσφέρεις - βρες αυτόν που σου
                ταιριάζει
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all"
                >
                  <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <role.icon className="text-pink-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {role.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {role.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Τι χρειάζεται;
              </h2>
              <p className="text-xl text-gray-600">
                Απλά πράγματα που κάνουν μεγάλη διαφορά
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <ul className="space-y-4">
                {requirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-4">
                    <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
                      <Heart className="text-pink-600" size={20} />
                    </div>
                    <span className="text-lg text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Πώς ξεκινάς;
              </h2>
              <p className="text-xl text-gray-600">
                Απλά 4 βήματα για να γίνεις μέλος της ομάδας μας
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Επικοινωνία",
                  description: "Στείλε μας μήνυμα με το ενδιαφέρον σου",
                },
                {
                  step: "2",
                  title: "Συνάντηση",
                  description: "Κανονίζουμε μια συνάντηση να γνωριστούμε",
                },
                {
                  step: "3",
                  title: "Εκπαίδευση",
                  description: "Σε εκπαιδεύουμε στον ρόλο που επέλεξες",
                },
                {
                  step: "4",
                  title: "Δράση",
                  description: "Ξεκινάς να κάνεις τη διαφορά!",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Τι λένε οι εθελοντές μας
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Μαρία Π.",
                  role: "Εθελόντρια 2 ετών",
                  quote:
                    "Η εμπειρία του εθελοντισμού με έχει αλλάξει. Κάθε Σάββατο που περνάω με τα ζωάκια είναι η καλύτερη μέρα της εβδομάδας μου.",
                },
                {
                  name: "Νίκος Δ.",
                  role: "Foster εθελοντής",
                  quote:
                    "Φιλοξενώ ζωάκια στο σπίτι μου και είναι απίστευτο να βλέπεις πώς ανθίζουν με λίγη αγάπη και φροντίδα.",
                },
                {
                  name: "Σοφία Γ.",
                  role: "Social Media εθελόντρια",
                  quote:
                    "Βοηθάω με τα social media και είναι συγκινητικό να βλέπω ζωάκια που φωτογράφισα να βρίσκουν σπίτι.",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
                >
                  <p className="text-gray-700 italic mb-6 leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Έτοιμος/η να ξεκινήσεις;
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                Γίνε μέλος της ομάδας μας και βοήθησε να σώσουμε περισσότερες
                ζωές μαζί
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-pink-600 hover:bg-pink-50 font-semibold"
                  asChild
                >
                  <Link href="/volunteer/apply">Γίνε Μέλος</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/contact">Έχω Ερωτήσεις</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
