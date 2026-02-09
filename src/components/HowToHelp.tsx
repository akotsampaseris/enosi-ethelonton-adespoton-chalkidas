"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Coins, HandHeart, Share2 } from "lucide-react";

const ways = [
    {
        icon: Heart,
        title: "Adopt",
        description: "Give an animal a loving forever home",
        cta: "Find Your Match",
        href: "/adopt",
        color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
        iconColor: "text-pink-600",
    },
    {
        icon: Coins,
        title: "Donate",
        description: "Support medical care, food, and shelter",
        cta: "Make a Donation",
        href: "/donate",
        color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
        iconColor: "text-purple-600",
    },
    {
        icon: HandHeart,
        title: "Volunteer",
        description: "Join our team and help hands-on",
        cta: "Get Involved",
        href: "/volunteer",
        color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
        iconColor: "text-blue-600",
    },
    {
        icon: Share2,
        title: "Spread the Word",
        description: "Share our mission with your network",
        cta: "Follow Us",
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
                        How You Can Help
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Every action makes a difference. Choose how you would
                        like to support our mission.
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {ways.map((way, index) => (
                        <motion.div
                            key={way.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={way.href}
                                className={`group block rounded-2xl border-2 ${way.color} p-8 transition`}
                            >
                                <div
                                    className={`mb-6 inline-flex rounded-xl bg-white p-3 shadow-sm ${way.iconColor}`}
                                >
                                    <way.icon className="h-8 w-8" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">
                                    {way.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {way.description}
                                </p>

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

                {/* Emergency banner */}
                <motion.div
                    className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-2xl font-bold text-white">
                        Found a Stray Animal?
                    </h3>
                    <p className="mt-2 text-white/90">
                        Call our emergency hotline 24/7 for immediate assistance
                    </p>
                    <a
                        href="tel:+302101234567"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-red-600 shadow-lg transition hover:bg-gray-50"
                    >
                        📞 Call Emergency Line
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
