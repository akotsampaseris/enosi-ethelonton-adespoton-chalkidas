"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Heart, CheckCircle, AlertCircle } from "lucide-react";

// Zod schema for volunteer form
const volunteerFormSchema = z.object({
    // Personal Information
    fullName: z.string().min(2, "Το όνομα είναι υποχρεωτικό"),
    email: z.email({
        error: "Μη έγκυρη διεύθυνση email",
    }),
    phone: z.string().min(10, "Το τηλέφωνο είναι υποχρεωτικό"),
    age: z.string("Επιλέξτε ηλικιακή ομάδα"),
    city: z.string().min(2, "Η πόλη είναι υποχρεωτική"),

    // Availability
    availability: z.array(z.string()).min(1, "Επιλέξτε τουλάχιστον μία μέρα"),
    hoursPerWeek: z.string("Επιλέξτε διαθεσιμότητα"),

    // Interests
    interests: z.array(z.string()).min(1, "Επιλέξτε τουλάχιστον έναν τομέα ενδιαφέροντος"),

    // Experience
    hasExperience: z.string("Επιλέξτε αν έχετε εμπειρία"),
    experience: z.string().optional(),

    // Motivation
    whyVolunteer: z.string().min(20, "Παρακαλώ γράψτε τουλάχιστον 20 χαρακτήρες"),

    // Skills
    skills: z.string().optional(),

    // Agreement
    agreeToTerms: z.boolean().refine((val) => val === true, "Πρέπει να αποδεχτείτε τους όρους"),
});

type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export default function VolunteerApplicationForm() {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useForm<VolunteerFormValues>({
        resolver: standardSchemaResolver(volunteerFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            city: "",
            experience: "",
            whyVolunteer: "",
            skills: "",
            availability: [],
            interests: [],
            agreeToTerms: false,
        },
    });

    const onSubmit = async (values: VolunteerFormValues) => {
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/volunteers", {
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

    const daysOfWeek = [
        { id: "monday", label: "Δευτέρα" },
        { id: "tuesday", label: "Τρίτη" },
        { id: "wednesday", label: "Τετάρτη" },
        { id: "thursday", label: "Πέμπτη" },
        { id: "friday", label: "Παρασκευή" },
        { id: "saturday", label: "Σάββατο" },
        { id: "sunday", label: "Κυριακή" },
    ];

    const volunteerRoles = [
        { id: "fostering", label: "Φιλοξενία ζώων" },
        { id: "vet-support", label: "Κτηνιατρική υποστήριξη" },
        { id: "events", label: "Εκδηλώσεις & Υιοθεσίες" },
        { id: "photography", label: "Φωτογραφία & Media" },
        { id: "social-media", label: "Social Media & Marketing" },
        { id: "admin", label: "Διοικητική υποστήριξη" },
        { id: "fundraising", label: "Συλλογή χρημάτων" },
        { id: "other", label: "Άλλο" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12">
                <div className="container mx-auto max-w-4xl px-4">
                    <Link href="/volunteer">
                        <Button variant="ghost" className="text-white hover:bg-pink-600 mb-4">
                            <ArrowLeft className="mr-2" size={20} />
                            Πίσω
                        </Button>
                    </Link>

                    <div className="flex items-start gap-4">
                        <Heart className="w-12 h-12" />
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Αίτηση Εθελοντισμού</h1>
                            <p className="text-pink-100 text-lg">Γίνε μέλος της ομάδας μας</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border-b border-blue-200">
                <div className="container mx-auto max-w-4xl px-4 py-6">
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-500 rounded-full p-2 flex-shrink-0">
                            <Heart className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-1">Ευχαριστούμε για το ενδιαφέρον σας!</h3>
                            <p className="text-sm text-blue-700">Συμπληρώστε την αίτηση και θα επικοινωνήσουμε μαζί σας σύντομα για τα επόμενα βήματα.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="container mx-auto max-w-4xl px-4 py-12">
                {submitStatus === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-green-900 mb-2">Η αίτησή σας υποβλήθηκε επιτυχώς!</h2>
                        <p className="text-green-700 mb-6">Θα επικοινωνήσουμε μαζί σας σύντομα για να σας ενημερώσουμε για τα επόμενα βήματα.</p>
                        <Button asChild className="bg-pink-500 hover:bg-pink-600">
                            <Link href="/volunteer">Επιστροφή</Link>
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
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ηλικία *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="under-18">Κάτω από 18</SelectItem>
                                                        <SelectItem value="18-25">18-25</SelectItem>
                                                        <SelectItem value="26-35">26-35</SelectItem>
                                                        <SelectItem value="36-50">36-50</SelectItem>
                                                        <SelectItem value="50+">50+</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>Πόλη/Περιοχή *</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Availability */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Διαθεσιμότητα</h2>

                                <div className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="availability"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Ποιες μέρες είστε διαθέσιμος/η; * (επιλέξτε όσες θέλετε)</FormLabel>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                                                    {daysOfWeek.map((day) => (
                                                        <FormField
                                                            key={day.id}
                                                            control={form.control}
                                                            name="availability"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(day.id)}
                                                                            onCheckedChange={(checked) => {
                                                                                const current = field.value || [];
                                                                                if (checked) {
                                                                                    field.onChange([...current, day.id]);
                                                                                } else {
                                                                                    field.onChange(current.filter((val) => val !== day.id));
                                                                                }
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal cursor-pointer">{day.label}</FormLabel>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hoursPerWeek"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Πόσες ώρες την εβδομάδα μπορείτε να διαθέσετε; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1-2">1-2 ώρες</SelectItem>
                                                        <SelectItem value="3-5">3-5 ώρες</SelectItem>
                                                        <SelectItem value="6-10">6-10 ώρες</SelectItem>
                                                        <SelectItem value="10+">10+ ώρες</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Interests */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Τομείς Ενδιαφέροντος</h2>

                                <FormField
                                    control={form.control}
                                    name="interests"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Σε ποιους τομείς θα θέλατε να βοηθήσετε; * (επιλέξτε όσους θέλετε)</FormLabel>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                                {volunteerRoles.map((role) => (
                                                    <FormField
                                                        key={role.id}
                                                        control={form.control}
                                                        name="interests"
                                                        render={({ field }) => (
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(role.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            const current = field.value || [];
                                                                            if (checked) {
                                                                                field.onChange([...current, role.id]);
                                                                            } else {
                                                                                field.onChange(current.filter((val) => val !== role.id));
                                                                            }
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal cursor-pointer">{role.label}</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </section>

                            {/* Experience */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Εμπειρία</h2>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="hasExperience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Έχετε εμπειρία με ζώα ή εθελοντισμό; *</FormLabel>
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
                                        name="experience"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Αν ναι, περιγράψτε την εμπειρία σας</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="π.χ. Εθελοντής σε άλλο καταφύγιο, ιδιοκτήτης κατοικιδίων..." rows={3} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Motivation & Skills */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Κίνητρο & Δεξιότητες</h2>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="whyVolunteer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Γιατί θέλετε να γίνετε εθελοντής; *</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Μοιραστείτε τους λόγους σας..." rows={5} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="skills"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ειδικές δεξιότητες που θα μπορούσαν να βοηθήσουν (προαιρετικό)</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="π.χ. Φωτογραφία, σχεδιασμός, social media, οδήγηση, οργάνωση εκδηλώσεων..." rows={3} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Agreement */}
                            <section className="bg-pink-50 rounded-2xl border border-pink-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Συμφωνία</h2>

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
                                                    <div>
                                                        Καταλαβαίνω ότι ο εθελοντισμός απαιτεί δέσμευση και υπευθυνότητα. Συμφωνώ να ακολουθώ τις οδηγίες της οργάνωσης και να
                                                        σεβαστώ τους{" "}
                                                        <Link href="/volunteer/terms" className="text-pink-600 underline">
                                                            όρους εθελοντισμού
                                                        </Link>
                                                    </div>
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />
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
                                    <Link href="/volunteer">Ακύρωση</Link>
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
