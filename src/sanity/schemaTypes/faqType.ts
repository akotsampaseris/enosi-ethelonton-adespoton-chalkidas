import { defineField, defineType } from "sanity";

export const faqType = defineType({
    name: "faq",
    title: "FAQ",
    type: "document",
    fields: [
        defineField({
            name: "question",
            title: "Question",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "answer",
            title: "Answer",
            type: "text",
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Υιοθεσία", value: "adoption" },
                    { title: "Φιλοξενία", value: "fostering" },
                    { title: "Εθελοντισμός", value: "volunteering" },
                    { title: "Δωρεές", value: "donations" },
                    { title: "Γενικά", value: "general" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first within each category",
            validation: (Rule) => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: "question",
            subtitle: "category",
        },
    },
    orderings: [
        {
            title: "Category & Order",
            name: "categoryOrder",
            by: [
                { field: "category", direction: "asc" },
                { field: "order", direction: "asc" },
            ],
        },
    ],
});
