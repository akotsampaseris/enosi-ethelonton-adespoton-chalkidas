"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Users, Home, Award, Target, Sparkles } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  order: number;
}

interface AboutPageProps {
  teamMembers: TeamMember[];
}

export default function AboutPage({ teamMembers }: AboutPageProps) {
  const stats = [
    { number: "500+", label: "Ζώα Διασώθηκαν", icon: Heart },
    { number: "300+", label: "Επιτυχημένες Υιοθεσίες", icon: Home },
    { number: "50+", label: "Ενεργοί Εθελοντές", icon: Users },
    { number: "16+", label: "Χρόνια Λειτουργίας", icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: "Συμπόνια",
      description:
        "Κάθε ζώο αξίζει αγάπη, φροντίδα και μια δεύτερη ευκαιρία για ευτυχία.",
    },
    {
      icon: Target,
      title: "Δέσμευση",
      description:
        "Είμαστε αφοσιωμένοι στο να βρούμε το τέλειο σπίτι για κάθε διασωθέν ζώο.",
    },
    {
      icon: Users,
      title: "Κοινότητα",
      description:
        "Μαζί με τους εθελοντές και τους υποστηρικτές μας, κάνουμε πραγματική διαφορά.",
    },
    {
      icon: Sparkles,
      title: "Διαφάνεια",
      description:
        "Λειτουργούμε με ειλικρίνεια και ανοιχτότητα σε όλα όσα κάνουμε.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Η Ιστορία μας
            </h1>
            <p className="text-xl md:text-2xl text-pink-100 leading-relaxed">
              Σώζουμε ζωές, ένα ζώο τη φορά, και χτίζουμε μια κοινότητα όπου
              κάθε κατοικίδιο βρίσκει το παντοτινό του σπίτι.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gray-50">
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
                  src="/images/about-mission.jpeg"
                  alt="Η αποστολή μας"
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
                Η Αποστολή μας
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Ιδρυθήκαμε το 2010 και είμαστε μια μη κερδοσκοπική οργάνωση
                αφοσιωμένη στη διάσωση, αποκατάσταση και επανένταξη
                εγκαταλελειμμένων και αδέσποτων ζώων στη Χαλκίδα και τις γύρω
                περιοχές.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Πιστεύουμε ότι κάθε ζώο αξίζει ένα σπίτι γεμάτο αγάπη και
                συμπονετική φροντίδα. Μέσω των προσπαθειών διάσωσης, του
                προγράμματος φιλοξενίας και των υπηρεσιών υιοθεσίας μας, έχουμε
                βοηθήσει εκατοντάδες ζώα να βρουν τις οικογένειές τους.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Το έργο μας είναι δυνατό χάρη στην αφοσίωση των εθελοντών μας,
                τη γενναιοδωρία των δωρητών μας και την αγάπη της κοινότητάς
                μας.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Η Επίδρασή μας
            </h2>
            <p className="text-xl text-gray-600">
              Μαζί, κάνουμε τη διαφορά στην κοινότητά μας
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="text-pink-600" size={32} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Οι Αξίες μας
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Αυτές οι βασικές αρχές καθοδηγούν όλα όσα κάνουμε
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 transition-colors"
              >
                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <value.icon className="text-pink-600" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Η Ομάδα μας
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Αφοσιωμένοι άνθρωποι που εργάζονται ακούραστα για την προστασία
              των ζώων
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-200">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                      <Users className="text-pink-500" size={64} />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Πώς Λειτουργούμε
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Η ολοκληρωμένη προσέγγισή μας για τη διάσωση και την προστασία των
              ζώων
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Διάσωση</h3>
              <p className="text-gray-700 leading-relaxed">
                Ανταποκρινόμαστε σε αναφορές για εγκαταλελειμμένα ή αδέσποτα
                ζώα, παρέχοντας άμεση φροντίδα και ασφάλεια.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Αποκατάσταση
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Πλήρης κτηνιατρική φροντίδα, κοινωνικοποίηση και φιλοξενία
                προετοιμάζουν τα ζώα για τα νέα τους σπίτια.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Επανένταξη
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Προσεκτική αντιστοίχιση με οικογένειες γεμάτες αγάπη διασφαλίζει
                ότι κάθε υιοθεσία είναι το τέλειο ταίρι.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ελάτε στην Αποστολή μας
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Είτε μέσω υιοθεσίας, φιλοξενίας, εθελοντισμού ή δωρεάς, υπάρχουν
              πολλοί τρόποι να κάνετε τη διαφορά.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 font-semibold"
                asChild
              >
                <Link href="/volunteer">Γίνε Εθελοντής</Link>
              </Button>
              <Button
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white/10 font-bold"
                asChild
              >
                <Link href="/donate">Κάνε μια Δωρεά</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
