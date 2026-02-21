import { defineField, defineType } from "sanity";

export const successStoryType = defineType({
  name: "successStory",
  title: "Success Stories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Story Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "animalName",
      title: "Animal Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "animalName",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "adopterName",
      title: "Adopter Name",
      type: "string",
      description: "Name of the person/family who adopted",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "adoptionDate",
      title: "Adoption Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "Photo of the animal in their new home",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image (Optional)",
      type: "image",
      description: "Photo from rescue/shelter",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      description: "Brief summary (1-2 sentences) for cards",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "story",
      title: "Full Story",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Story",
      type: "boolean",
      description: "Show this story prominently on the success stories page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "animalName",
      subtitle: "adopterName",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        ...selection,
        subtitle: `Adopted by ${subtitle}`,
      };
    },
  },
  orderings: [
    {
      title: "Adoption Date (Newest First)",
      name: "adoptionDateDesc",
      by: [{ field: "adoptionDate", direction: "desc" }],
    },
  ],
});
