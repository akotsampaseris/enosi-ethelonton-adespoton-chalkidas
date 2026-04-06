"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Coins, HandHeart, Share2 } from "lucide-react";

const ways = [
  {
    icon: Heart,
    title: "Υιοθέτησε",
    description:
      "Άνοιξε την αγκαλιά σου για ένα ζωάκι και βρες τον καλύτερο σου φίλο.",
    cta: "Βρες τον νέο σου φίλο",
    href: "/adopt",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
    iconColor: "text-pink-600",
  },
  {
    icon: Coins,
    title: "Κάνε μια δωρεά",
    description:
      "Στήριξε την ιατρική φροντίδα, τις τροφές και τις φιλοξενίες που προσφέρουμε.",
    cta: "Κάνε μια δωρεά",
    href: "/donate",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    icon: HandHeart,
    title: "Γίνε εθελοντής",
    description: "Έλα στην ομάδα μας και φέρε άμεσα την αλλαγή. ",
    cta: "Γίνε μέλος",
    href: "/volunteer",
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
    iconColor: "text-blue-600",
  },
  {
    icon: Share2,
    title: "Διάδωσε το μήνυμα",
    description: "Μοιράσου την αποστολή μας με τους δικούς σου ανθρώπους.",
    cta: "Ακολούθησε μας",
    href: "/social",
    color: "bg-rose-50 hover:bg-rose-100 border-rose-200",
    iconColor: "text-rose-600",
  },
];

export function HowToHelp() {
  return (
    <section className="bg-gray-50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Πως να μας βοηθήσεις
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Κάθε πράξη φέρνει τη διαφορά. Υπάρχουν πολλές επιλογές να μας
            στηρίξεις.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {ways.map((way, index) => (
            <motion.div
              key={way.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group block rounded-2xl border-2 ${way.color} p-8 transition`}
            >
              <Link href={way.href}>
                <div
                  className={`mb-6 inline-flex rounded-xl bg-white p-3 shadow-sm ${way.iconColor}`}
                >
                  <way.icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-bold text-gray-900">{way.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{way.description}</p>

                <div
                  className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${way.iconColor} group-hover:gap-3 transition-all`}
                >
                  {way.cta}
                  <span aria-hidden="true">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
