"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        // Replace with your actual newsletter API endpoint
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setStatus("success");
            setEmail("");
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 px-6 py-24 lg:px-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[url('/paw-pattern.svg')] opacity-5" />

            <div className="absolute -left-10 top-20 h-64 w-64 rounded-full bg-pink-300/30 blur-3xl" />
            <div className="absolute -right-10 bottom-20 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl" />

            <motion.div
                className="relative mx-auto max-w-2xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm">
                    <Heart className="h-4 w-4 fill-current" />
                    Stay Connected
                </div>

                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Get Weekly Updates
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Receive heartwarming stories, adoption alerts, and ways you
                    can help directly to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
                        <div className="relative flex-1">
                            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full rounded-full border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/20"
                                disabled={status === "loading"}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-pink-700 disabled:opacity-50"
                        >
                            {status === "loading" ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Subscribing...
                                </>
                            ) : (
                                <>
                                    <Heart className="h-5 w-5" />
                                    Subscribe
                                </>
                            )}
                        </button>
                    </div>

                    {status === "success" && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-sm font-medium text-green-600"
                        >
                            ✓ Welcome to our community! Check your email to
                            confirm.
                        </motion.p>
                    )}

                    {status === "error" && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-sm font-medium text-red-600"
                        >
                            Something went wrong. Please try again.
                        </motion.p>
                    )}

                    <p className="mt-4 text-sm text-gray-500">
                        We respect your privacy. Unsubscribe anytime. No spam,
                        we promise! 🐾
                    </p>
                </form>

                {/* Social proof */}
                <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
                    <div>
                        <div className="text-2xl font-bold text-pink-600">
                            2,000+
                        </div>
                        <div>Subscribers</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300" />
                    <div>
                        <div className="text-2xl font-bold text-pink-600">
                            Weekly
                        </div>
                        <div>Newsletter</div>
                    </div>
                    <div className="h-12 w-px bg-gray-300" />
                    <div>
                        <div className="text-2xl font-bold text-pink-600">
                            No Spam
                        </div>
                        <div>Guaranteed</div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
