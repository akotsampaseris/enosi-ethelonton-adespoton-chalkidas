import { defineField, defineType } from "sanity";

export const animalType = defineType({
  name: "animal",
  title: "Ζώα προς υιοθεσία",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Όνομα",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "species",
      title: "Είδος",
      type: "string",
      options: {
        list: [
          { title: "Σκύλος", value: "Σκύλος" },
          { title: "Γάτα", value: "Γάτα" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "age",
      title: "Ηλικία",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(30),
    }),
    defineField({
      name: "weight",
      title: "Βάρος (σε κιλά)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "gender",
      title: "Φύλο",
      type: "string",
      options: {
        list: [
          { title: "Αρσενικό", value: "Αρσενικό" },
          { title: "Θηλυκό", value: "Θηλυκό" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Τοποθεσία",
      type: "string",
      initialValue: "Χαλκίδα, Ελλάδα",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Κατάσταση",
      type: "string",
      options: {
        list: [
          { title: "Διαθέσιμο", value: "Διαθέσιμο" },
          { title: "Υιοθετήθηκε", value: "Υιοθετήθηκε" },
        ],
      },
      initialValue: "Διαθέσιμο",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Εικόνα",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Φωτογραφίες",
      type: "array",
      of: [{ type: "image" }],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "description",
      title: "Περιγραφή",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "personality",
      title: "Χαρακτήρας",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Φιλικό", value: "Φιλικό" },
          { title: "Ενεργητικό", value: "Ενεργητικό" },
          { title: "Ήρεμο", value: "Ήρεμο" },
          { title: "Παιχνιδιάρικο", value: "Παιχνιδιάρικο" },
          { title: "Κοινωνικό", value: "Κοινωνικό" },
          { title: "Ανεξάρτητο", value: "Ανεξάρτητο" },
          { title: "Πιστό", value: "Πιστό" },
          { title: "Προστατευτικό", value: "Προστατευτικό" },
        ],
      },
    }),
    defineField({
      name: "goodWith",
      title: "Καλά με",
      type: "object",
      fields: [
        {
          name: "kids",
          title: "Παιδιά",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "dogs",
          title: "Σκύλοι",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "cats",
          title: "Γάτες",
          type: "boolean",
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: "medicalInfo",
      title: "Ιατρικές Πληροφορίες",
      type: "object",
      fields: [
        {
          name: "vaccinated",
          title: "Εμβολιασμένο",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "neutered",
          title: "Στειρωμένο",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "microchipped",
          title: "Με Μικροτσίπ",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "specialNeeds",
          title: "Ειδικές Ανάγκες",
          type: "text",
          rows: 2,
        },
      ],
    }),
    defineField({
      name: "rescueStory",
      title: "Ιστορία Διάσωσης",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "adoptedBy",
      title: "Υιοθετήθηκε από",
      type: "string",
      hidden: ({ document }) => document?.status !== "Υιοθετήθηκε",
    }),
    defineField({
      name: "adoptionDate",
      title: "Ημερομηνία Υιοθεσίας",
      type: "date",
      hidden: ({ document }) => document?.status !== "Υιοθετήθηκε",
    }),
  ],
  preview: {
    select: {
      title: "name",
      species: "species",
      status: "status",
      media: "image",
    },
    prepare(selection) {
      const { title, species, status, media } = selection;
      return {
        title: title,
        subtitle: `${species} - ${status}`,
        media: media,
      };
    },
  },
});
