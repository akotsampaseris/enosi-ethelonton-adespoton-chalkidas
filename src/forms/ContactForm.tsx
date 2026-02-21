"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";

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
  subject: z.enum(
    ["general", "adoption", "foster", "volunteer", "donation", "other"],
    {
      error: "Επιλέξτε θέμα",
    },
  ),
  message: z
    .string({
      error: "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες",
    })
    .min(10),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Επικοινωνήστε μαζί μας
            </h1>
            <p className="text-xl text-pink-100">
              Είμαστε εδώ να σας βοηθήσουμε και να απαντήσουμε σε οποιαδήποτε
              ερώτηση
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Στοιχεία Επικοινωνίας
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                    <Phone className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Τηλέφωνο
                    </h3>
                    <a
                      href="tel:+302102102100"
                      className="text-gray-600 hover:text-pink-600"
                    >
                      +30 210 210 2100
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                    <Mail className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:info@animalrescue.gr"
                      className="text-gray-600 hover:text-pink-600"
                    >
                      info@animalrescue.gr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 rounded-full p-3 flex-shrink-0">
                    <MapPin className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Διεύθυνση
                    </h3>
                    <p className="text-gray-600">Χαλκίδα, Ελλάδα</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Ώρες Επικοινωνίας
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Δευτέρα - Παρασκευή</span>
                  <span className="font-medium text-gray-900">
                    9:00 - 20:00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Σάββατο</span>
                  <span className="font-medium text-gray-900">
                    10:00 - 14:00
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                Ακολουθήστε μας
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com/ethelontesadespotwnchalkidas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6 text-gray-700 hover:text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/enosi_ethel_adespoton_chalkida"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-pink-100 p-3 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6 text-gray-700 hover:text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
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
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-900 mb-2">
                  Το μήνυμά σας στάλθηκε!
                </h2>
                <p className="text-green-700 mb-6">
                  Σας ευχαριστούμε για την επικοινωνία. Θα σας απαντήσουμε
                  σύντομα.
                </p>
                <Button
                  onClick={() => setSubmitStatus("idle")}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  Στείλτε άλλο μήνυμα
                </Button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Στείλτε μας μήνυμα
                </h2>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
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
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                              />
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
                              <Input
                                type="tel"
                                placeholder="+30 123 456 7890"
                                {...field}
                              />
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Επιλέξτε θέμα..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">
                                Γενική ερώτηση
                              </SelectItem>
                              <SelectItem value="adoption">Υιοθεσία</SelectItem>
                              <SelectItem value="foster">Φιλοξενία</SelectItem>
                              <SelectItem value="volunteer">
                                Εθελοντισμός
                              </SelectItem>
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
                            <Textarea
                              placeholder="Γράψτε το μήνυμά σας εδώ..."
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {submitStatus === "error" && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                        <AlertCircle
                          className="text-red-500 flex-shrink-0 mt-0.5"
                          size={20}
                        />
                        <p className="text-red-700">
                          Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg"
                    >
                      {form.formState.isSubmitting
                        ? "Αποστολή..."
                        : "Αποστολή Μηνύματος"}
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
