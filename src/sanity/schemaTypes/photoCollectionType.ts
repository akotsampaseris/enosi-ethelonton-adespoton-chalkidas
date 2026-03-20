// sanity/schemas/photoCollection.ts
import { defineField, defineType } from "sanity";

export const photoCollectionType = defineType({
    name: "photoCollection",
    title: "Συλλογές Φωτογραφιών",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Τίτλος",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug (URL)",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Περιγραφή",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "date",
            title: "Ημερομηνία Εκδήλωσης",
            type: "date",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Εικόνα Εξωφύλλου",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "photos",
            title: "Φωτογραφίες",
            type: "array",
            of: [
                {
                    type: "image",
                    name: "image",
                    title: "Φωτογραφία",
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Περιγραφή",
                        },
                    ],
                },
                {
                    type: "file",
                    name: "video",
                    title: "Βίντεο",
                    options: {
                        accept: "video/*",
                    },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Περιγραφή",
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
    ],
    preview: {
        select: {
            title: "title",
            date: "date",
            media: "coverImage",
            photoCount: "photos.length",
        },
        prepare(selection) {
            const { title, date, media, photoCount } = selection;
            return {
                title: title,
                subtitle: `${date} • ${photoCount} φωτογραφίες`,
                media: media,
            };
        },
    },
});
