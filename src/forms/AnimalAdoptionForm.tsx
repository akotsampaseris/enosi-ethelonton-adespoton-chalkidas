"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Heart, CheckCircle, AlertCircle } from "lucide-react";
import { AnimalType } from "@/types/animal";

interface AdoptionFormProps {
    animal?: AnimalType;
}

// Zod schema for form validation
const adoptionFormSchema = z.object({
    // Personal Information
    fullName: z.string().min(2, "Το ονοματεπώνυμο πρέπει να έχει τουλάχιστον 2 χαρακτήρες"),
    email: z.email("Μη έγκυρη διεύθυνση email"),
    phone: z.string().min(10, "Μη έγκυρος αριθμός τηλεφώνου"),
    address: z.string().min(5, "Η διεύθυνση είναι υποχρεωτική"),
    city: z.string().min(2, "Η πόλη είναι υποχρεωτική"),

    // Living Situation
    housingType: z.enum(["apartment", "house", "other"], "Επιλέξτε τον τύπο κατοικίας"),
    hasYard: z.enum(["yes", "no"], "Επιλέξτε αν έχετε αυλή"),

    // Experience
    hadPetsBefore: z.enum(["yes", "no"], "Επιλέξτε αν είχατε ζώα στο παρελθόν"),
    currentPets: z.string().optional(),

    // Availability
    workSchedule: z.string().min(5, "Περιγράψτε το πρόγραμμα εργασίας σας"),
    whoWillCare: z.string().min(10, "Περιγράψτε ποιος θα φροντίζει το ζώο"),

    // Motivation
    whyAdopt: z.string().min(20, "Παρακαλώ γράψτε τουλάχιστον 20 χαρακτήρες"),

    // Agreements
    agreeToHomeVisit: z.boolean().refine((val) => val === true, "Πρέπει να συμφωνήσετε με την επίσκεψη"),
    agreeToFollowUp: z.boolean().refine((val) => val === true, "Πρέπει να συμφωνήσετε με το follow-up"),
    agreeToTerms: z.boolean().refine((val) => val === true, "Πρέπει να αποδεχτείτε τους όρους"),
});

type AdoptionFormValues = z.infer<typeof adoptionFormSchema>;

export default function AnimalAdoptionForm({ animal }: AdoptionFormProps) {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useForm<AdoptionFormValues>({
        resolver: standardSchemaResolver(adoptionFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            currentPets: "",
            workSchedule: "",
            whoWillCare: "",
            whyAdopt: "",
            agreeToHomeVisit: false,
            agreeToFollowUp: false,
            agreeToTerms: false,
        },
    });

    const onSubmit = async (values: AdoptionFormValues) => {
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/adoptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...values,
                    animalId: animal?._id,
                    animalName: animal?.name,
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
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-800 to-pink to-pink-500 text-white py-12">
                <div className="container mx-auto max-w-4xl px-4">
                    <Link href={animal ? `/animals/${animal.slug}` : "/animals"}>
                        <Button variant="ghost" className="text-white hover:bg-pink-600 mb-4">
                            <ArrowLeft className="mr-2" size={20} />
                            Πίσω
                        </Button>
                    </Link>

                    <div className="flex items-start gap-4">
                        <Heart className="w-12 h-12" />
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Αίτηση Υιοθεσίας</h1>
                            {animal && (
                                <p className="text-pink-100 text-lg font-semibold">
                                    για {animal.gender == "Αρσενικό" ? "τον" : "την"} {animal.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Animal Preview */}
            {animal && (
                <div className="border-b border-gray-200 bg-gray-50">
                    <div className="container mx-auto max-w-4xl px-4 py-6">
                        <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-200">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                <Image src={animal.image} alt={animal.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{animal.name}</h3>
                                <p className="text-sm text-gray-600">
                                    {animal.species} • {animal.age} {animal.age === 1 ? "έτους" : "χρονών"} • {animal.gender}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Form */}
            <div className="container mx-auto max-w-4xl px-4 py-12">
                {submitStatus === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-green-900 mb-2">Η αίτηση σας υποβλήθηκε επιτυχώς!</h2>
                        <p className="text-green-700 mb-6">Θα επικοινωνήσουμε μαζί σας σύντομα για τα επόμενα βήματα.</p>
                        <Button asChild className="bg-pink-500 hover:bg-pink-600">
                            <Link href="/animals">Επιστροφή στα ζωάκια</Link>
                        </Button>
                    </motion.div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* Personal Information */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Προσωπικές Πληροφορίες</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ονοματεπώνυμο *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email *</FormLabel>
                                                <FormControl>
                                                    <Input type="email" {...field} />
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
                                                <FormLabel>Τηλέφωνο *</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Πόλη *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>Διεύθυνση *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Living Situation */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Συνθήκες Διαβίωσης</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="housingType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Τύπος κατοικίας *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="apartment">Διαμέρισμα</SelectItem>
                                                        <SelectItem value="house">Μονοκατοικία</SelectItem>
                                                        <SelectItem value="other">Άλλο</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hasYard"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Έχει αυλή/κήπο; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Ναι</SelectItem>
                                                        <SelectItem value="no">Όχι</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Experience with Pets */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Εμπειρία με Ζώα</h2>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="hadPetsBefore"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Έχετε αναθρέψει ζώα στο παρελθόν; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Ναι</SelectItem>
                                                        <SelectItem value="no">Όχι</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="currentPets"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Έχετε άλλα κατοικίδια αυτή τη στιγμή;</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Αν ναι, περιγράψτε..." rows={3} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Availability & Care */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Διαθεσιμότητα & Φροντίδα</h2>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="workSchedule"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Πρόγραμμα εργασίας *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="π.χ. 9-5 καθημερινά, βάρδιες, από σπίτι..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="whoWillCare"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ποιος θα φροντίζει το ζώο; *</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Περιγράψτε ποιος θα αναλάβει την καθημερινή φροντίδα..." rows={3} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Motivation */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Γιατί θέλετε να υιοθετήσετε;</h2>

                                <FormField
                                    control={form.control}
                                    name="whyAdopt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Πείτε μας για τους λόγους που θέλετε να υιοθετήσετε{" "}
                                                {animal
                                                    ? `
                                                    ${animal.gender == "Αρσενικό" ? "τον" : "την"}
                                                    ${animal.name}`
                                                    : "ένα ζώο"}{" "}
                                                *
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Μοιραστείτε τις σκέψεις σας..." rows={5} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </section>

                            {/* Agreements */}
                            <section className="bg-pink-50 rounded-2xl border border-pink-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Συμφωνίες</h2>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="agreeToHomeVisit"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="font-normal cursor-pointer">Συμφωνώ σε επίσκεψη στο σπίτι μου πριν την υιοθεσία</FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="agreeToFollowUp"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="font-normal cursor-pointer">Συμφωνώ σε follow-up επικοινωνίες μετά την υιοθεσία</FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="agreeToTerms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        <span>
                                                            Έχω διαβάσει και συμφωνώ με τους{" "}
                                                            <Link href="/terms?section=adoption" className="text-pink-600 underline" target="_blank">
                                                                όρους υιοθεσίας
                                                            </Link>
                                                        </span>
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Error Message */}
                            {submitStatus === "error" && (
                                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                                    <p className="text-red-700">Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" asChild disabled={form.formState.isSubmitting}>
                                    <Link href={animal ? `/animals/${animal.slug}` : "/animals"}>Ακύρωση</Link>
                                </Button>

                                <Button type="submit" disabled={form.formState.isSubmitting} className="bg-pink-500 hover:bg-pink-600 px-8">
                                    {form.formState.isSubmitting ? "Υποβολή..." : "Υποβολή Αίτησης"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}
