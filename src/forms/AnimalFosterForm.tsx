"use client";

import { useState } from "react";
import Image from "next/image";
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
import { AnimalType } from "@/types/animal";

interface FosterFormProps {
    animal?: AnimalType;
}

// Zod schema for foster form
const fosterFormSchema = z.object({
    // Personal Information
    fullName: z
        .string({
            error: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες",
        })
        .min(2),
    email: z.email({
        error: "Μη έγκυρη διεύθυνση email",
    }),
    phone: z
        .string({
            error: "Μη έγκυρος αριθμός τηλεφώνου",
        })
        .min(10),
    address: z
        .string({
            error: "Η διεύθυνση είναι υποχρεωτική",
        })
        .min(5),
    city: z
        .string({
            error: "Η πόλη είναι υποχρεωτική",
        })
        .min(2),

    // Living Situation
    housingType: z.enum(["apartment", "house", "other"], {
        error: "Επιλέξτε τον τύπο κατοικίας",
    }),
    hasYard: z.enum(["yes", "no"], {
        error: "Επιλέξτε αν έχετε αυλή",
    }),

    // Foster Specific
    fosterDuration: z.enum(["1-2weeks", "1month", "2-3months", "3+months", "flexible"], {
        error: "Επιλέξτε διάρκεια φιλοξενίας",
    }),
    preferredTypes: z.array(z.string()).min(1, "Επιλέξτε τουλάχιστον έναν τύπο"),
    canHandleMedical: z.enum(["yes", "no", "depends"], {
        error: "Επιλέξτε αν μπορείτε να φροντίσετε ζώα με ιατρικές ανάγκες",
    }),
    canTransport: z.enum(["yes", "no", "sometimes"], {
        error: "Επιλέξτε αν μπορείτε να μεταφέρετε το ζώο",
    }),

    // Experience
    hadPetsBefore: z.enum(["yes", "no"], {
        error: "Επιλέξτε αν είχατε ζώα στο παρελθόν",
    }),
    currentPets: z.string().optional(),
    fosteredBefore: z.enum(["yes", "no"], {
        error: "Επιλέξτε αν έχετε φιλοξενήσει ζώα στο παρελθόν",
    }),

    // Availability
    workSchedule: z.string().min(5, "Περιγράψτε το πρόγραμμα εργασίας σας"),

    // Motivation
    whyFoster: z.string().min(20, "Παρακαλώ γράψτε τουλάχιστον 20 χαρακτήρες"),

    // Agreements
    agreeToReturnAnimal: z
        .boolean({
            error: "Πρέπει να συμφωνήσετε να επιστρέψετε το ζώο",
        })
        .refine((val) => val === true),
    agreeToFollowGuidelines: z
        .boolean({
            error: "Πρέπει να συμφωνήσετε με τις οδηγίες",
        })
        .refine((val) => val === true),
    agreeToTerms: z
        .boolean({
            error: "Πρέπει να αποδεχτείτε τους όρους",
        })
        .refine((val) => val === true),
});

type FosterFormValues = z.infer<typeof fosterFormSchema>;

export default function AnimalFosterForm({ animal }: FosterFormProps) {
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const form = useForm<FosterFormValues>({
        resolver: standardSchemaResolver(fosterFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            currentPets: "",
            workSchedule: "",
            whyFoster: "",
            preferredTypes: [],
            agreeToReturnAnimal: false,
            agreeToFollowGuidelines: false,
            agreeToTerms: false,
        },
    });

    const onSubmit = async (values: FosterFormValues) => {
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/fosters", {
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

    const animalTypes = [
        { id: "puppies", label: "Κουτάβια" },
        { id: "adult-dogs", label: "Ενήλικοι σκύλοι" },
        { id: "senior-dogs", label: "Ηλικιωμένοι σκύλοι" },
        { id: "kittens", label: "Γατάκια" },
        { id: "adult-cats", label: "Ενήλικες γάτες" },
        { id: "senior-cats", label: "Ηλικιωμένες γάτες" },
        { id: "special-needs", label: "Ειδικές ανάγκες" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white py-12">
                <div className="container mx-auto max-w-4xl px-4">
                    <Link href={animal ? `/animals/${animal.slug}` : "/animals"}>
                        <Button variant="ghost" className="text-white hover:bg-pink-600 mb-4">
                            <ArrowLeft className="mr-2" size={20} />
                            Πίσω
                        </Button>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Heart className="w-12 h-12" />
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Αίτηση Φιλοξενίας</h1>
                            {animal && <p className="text-pink-100 text-lg">για το {animal.name}</p>}
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
                            <h3 className="font-semibold text-blue-900 mb-1">Τι είναι η φιλοξενία;</h3>
                            <p className="text-sm text-blue-700">
                                Η φιλοξενία είναι προσωρινή φροντίδα για ένα ζώο μέχρι να βρεθεί το μόνιμο σπίτι του. Η οργάνωση μας καλύπτει τα έξοδα κτηνιάτρου και τροφής. Εσείς
                                προσφέρετε αγάπη και ένα ασφαλές σπίτι!
                            </p>
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
                                    {animal.species} • {animal.age} έτη • {animal.gender}
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
                        <p className="text-green-700 mb-6">Θα επικοινωνήσουμε μαζί σας σύντομα για να συζητήσουμε τα επόμενα βήματα.</p>
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

                            {/* Foster Specific Details */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Λεπτομέρειες Φιλοξενίας</h2>

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="fosterDuration"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Πόσο καιρό μπορείτε να φιλοξενήσετε; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1-2weeks">1-2 εβδομάδες</SelectItem>
                                                        <SelectItem value="1month">1 μήνα</SelectItem>
                                                        <SelectItem value="2-3months">2-3 μήνες</SelectItem>
                                                        <SelectItem value="3+months">3+ μήνες</SelectItem>
                                                        <SelectItem value="flexible">Ευέλικτα</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="preferredTypes"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Τι τύπους ζώων μπορείτε να φιλοξενήσετε; * (επιλέξτε όσα θέλετε)</FormLabel>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                                                    {animalTypes.map((type) => (
                                                        <FormField
                                                            key={type.id}
                                                            control={form.control}
                                                            name="preferredTypes"
                                                            render={({ field }) => (
                                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={field.value?.includes(type.id)}
                                                                            onCheckedChange={(checked) => {
                                                                                const current = field.value || [];
                                                                                if (checked) {
                                                                                    field.onChange([...current, type.id]);
                                                                                } else {
                                                                                    field.onChange(current.filter((val) => val !== type.id));
                                                                                }
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal cursor-pointer">{type.label}</FormLabel>
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
                                        name="canHandleMedical"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Μπορείτε να φιλοξενήσετε ζώα με ιατρικές ανάγκες; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Ναι, άνετα</SelectItem>
                                                        <SelectItem value="depends">Εξαρτάται από την περίπτωση</SelectItem>
                                                        <SelectItem value="no">Όχι, προτιμώ υγιή ζώα</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="canTransport"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Μπορείτε να μεταφέρετε το ζώο σε ραντεβού κτηνιάτρου; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Ναι, όποτε χρειαστεί</SelectItem>
                                                        <SelectItem value="sometimes">Μερικές φορές</SelectItem>
                                                        <SelectItem value="no">Όχι, χρειάζομαι βοήθεια</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Experience */}
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

                                    <FormField
                                        control={form.control}
                                        name="fosteredBefore"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Έχετε φιλοξενήσει ζώα στο παρελθόν; *</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Επιλέξτε..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Ναι</SelectItem>
                                                        <SelectItem value="no">Όχι, θα είναι η πρώτη μου φορά</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </section>

                            {/* Availability */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Διαθεσιμότητα</h2>

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
                            </section>

                            {/* Motivation */}
                            <section className="bg-white rounded-2xl border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Γιατί θέλετε να φιλοξενήσετε;</h2>

                                <FormField
                                    control={form.control}
                                    name="whyFoster"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Πείτε μας για τους λόγους που θέλετε να φιλοξενήσετε {animal ? `το ${animal.name}` : "ένα ζώο"} *</FormLabel>
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
                                        name="agreeToReturnAnimal"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        Καταλαβαίνω ότι η φιλοξενία είναι προσωρινή και συμφωνώ να επιστρέψω το ζώο όταν βρεθεί μόνιμο σπίτι
                                                    </FormLabel>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="agreeToFollowGuidelines"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        Συμφωνώ να ακολουθώ τις οδηγίες της οργάνωσης για τη φροντίδα του ζώου
                                                    </FormLabel>
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
                                                            <Link href="/terms?section=foster" className="text-pink-600 underline" target="_blank">
                                                                όρους φιλοξενίας
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
