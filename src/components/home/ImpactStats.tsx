"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Home, Users, Stethoscope } from "lucide-react";

export function ImpactStats() {
    const t = useTranslations("home.impact");

    const stats = [
        {
            icon: Heart,
            value: "300+",
            label: t("stats.animalsRescued.label"),
            description: t("stats.animalsRescued.description"),
            color: "from-pink-500 to-rose-500",
        },
        {
            icon: Home,
            value: "150+",
            label: t("stats.adoptions.label"),
            description: t("stats.adoptions.description"),
            color: "from-purple-500 to-pink-500",
        },
        {
            icon: Stethoscope,
            value: "1,000+",
            label: t("stats.animalTreatments.label"),
            description: t("stats.animalTreatments.description"),
            color: "from-blue-500 to-purple-500",
        },
        {
            icon: Users,
            value: "50+",
            label: t("stats.activeVolunteers.label"),
            description: t("stats.activeVolunteers.description"),
            color: "from-pink-500 to-purple-500",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700 px-6 py-24 lg:px-8">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/images/paw-pattern.jpg')] opacity-5" />

            <div className="relative mx-auto max-w-7xl">
                <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("title")}</h2>
                    <p className="mt-4 text-lg text-pink-100">{t("subtitle")}</p>
                </motion.div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm ring-1 ring-white/20">
                            <div className={`mb-6 inline-flex rounded-2xl bg-gradient-to-br ${stat.color} p-3`}>
                                <stat.icon className="h-8 w-8 text-white" />
                            </div>

                            <div className="text-4xl font-bold text-white">{stat.value}</div>
                            <div className="mt-2 text-lg font-semibold text-white">{stat.label}</div>
                            <div className="mt-1 text-sm text-pink-100">{stat.description}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}>
                    <p className="text-lg text-white">{t("message")}</p>
                </motion.div>
            </div>
        </section>
    );
}
