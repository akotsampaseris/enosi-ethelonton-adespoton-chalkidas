import { defineField, defineType } from "sanity";

export const postType = defineType({
    name: "post",
    title: "Blog Posts",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "teamMember" }],
            description: "Select a team member as author",
        }),
        defineField({
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Adoption Stories", value: "adoption-stories" },
                    { title: "Animal Care", value: "animal-care" },
                    { title: "Events", value: "events" },
                    { title: "News", value: "news" },
                    { title: "Tips & Advice", value: "tips-advice" },
                    { title: "Volunteer Stories", value: "volunteer-stories" },
                ],
            },
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            description: "Short summary (1-2 sentences)",
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "array",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Normal", value: "normal" },
                        { title: "H2", value: "h2" },
                        { title: "H3", value: "h3" },
                        { title: "Quote", value: "blockquote" },
                    ],
                    marks: {
                        decorators: [
                            { title: "Strong", value: "strong" },
                            { title: "Emphasis", value: "em" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Link",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                    },
                                ],
                            },
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
            title: "Featured Post",
            type: "boolean",
            description: "Show this post prominently on the blog page",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "title",
            author: "author.name",
            media: "mainImage",
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
});
