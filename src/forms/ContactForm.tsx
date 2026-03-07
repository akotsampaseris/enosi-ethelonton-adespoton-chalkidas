"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Facebook, Instagram, Linkedin, Twitter, CheckCircle, AlertCircle } from "lucide-react";

// Zod schema for contact form
const contactFormSchema = z.object({
    name: z
        .string({
            error: "Το όνομα είναι υποχρεωτικό",
        })
        .min(2),
    email: z
        .string({
            error: "Μη έγκυρη διεύθυνση email",
        })
        .email(),
    phone: z.string().optional(),
    subject: z.enum(["general", "adoption", "foster", "volunteer", "donation", "other"], {
        error: "Επιλέξτε θέμα",
    }),
    message: z
        .string({
            error: "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες",
        })
        .min(10),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useForm<ContactFormValues>({
        resolver: standardSchemaResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    const onSubmit = async (values: ContactFormValues) => {
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    submittedAt: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setSubmitStatus("success");
            form.reset();
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-20">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Επικοινωνήστε μαζί μας</h1>
                        <p className="text-xl text-pink-100">Είμαστε εδώ να σας βοηθήσουμε και να απαντήσουμε σε οποιαδήποτε ερώτηση</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info + Form */}
            <section className="container mx-auto max-w-6xl px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Στοιχεία Επικοινωνίας</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                                        <Mail className="text-pink-600" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                        <a href="mailto:info@eeach.gr" className="text-gray-600 hover:text-pink-600">
                                            info@eeach.gr
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Ακολουθήστε μας</h3>
                            <div className="flex gap-4">
                                <a href="https://facebook.com/ethelontesadespotwnchalkidas" className="text-gray-500 hover:text-pink-500 transition">
                                    <span className="sr-only">Facebook</span>
                                    <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
                                        <Facebook className="h-6 w-6" />
                                    </div>
                                </a>
                                <a href="https://instagram.com/enosi_ethel_adespoton_chalkida" className="text-gray-500 hover:text-pink-500 transition">
                                    <span className="sr-only">Instagram</span>
                                    <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
                                        <Instagram className="h-6 w-6" />
                                    </div>
                                </a>
                                <a href="https://x.com/enethadchal" className="text-gray-500 hover:text-pink-500 transition">
                                    <span className="sr-only">X (Twitter)</span>
                                    <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
                                        <Twitter className="h-6 w-6" />
                                    </div>
                                </a>
                                <a href="https://linkedin.com/in/eeach" className="text-gray-500 hover:text-pink-500 transition">
                                    <span className="sr-only">LinkedIn</span>
                                    <div className="bg-pink-100 rounded-full p-2 flex-shrink-0">
                                        <Linkedin className="h-6 w-6" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        {submitStatus === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-green-900 mb-2">Το μήνυμά σας στάλθηκε!</h2>
                                <p className="text-green-700 mb-6">Σας ευχαριστούμε για την επικοινωνία. Θα σας απαντήσουμε σύντομα.</p>
                                <Button onClick={() => setSubmitStatus("idle")} className="bg-pink-500 hover:bg-pink-600">
                                    Στείλτε άλλο μήνυμα
                                </Button>
                            </motion.div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Στείλτε μας μήνυμα</h2>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Όνομα *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Το όνομά σας" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email *</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="your@email.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Τηλέφωνο (προαιρετικό)</FormLabel>
                                                        <FormControl>
                                                            <Input type="tel" placeholder="+30 123 456 7890" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Θέμα *</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Επιλέξτε θέμα..." />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="general">Γενική ερώτηση</SelectItem>
                                                            <SelectItem value="adoption">Υιοθεσία</SelectItem>
                                                            <SelectItem value="foster">Φιλοξενία</SelectItem>
                                                            <SelectItem value="volunteer">Εθελοντισμός</SelectItem>
                                                            <SelectItem value="donation">Δωρεά</SelectItem>
                                                            <SelectItem value="other">Άλλο</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Μήνυμα *</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Γράψτε το μήνυμά σας εδώ..." rows={6} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {submitStatus === "error" && (
                                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                                                <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                                <p className="text-red-700">Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.</p>
                                            </div>
                                        )}

                                        <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg">
                                            {form.formState.isSubmitting ? "Αποστολή..." : "Αποστολή Μηνύματος"}
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
