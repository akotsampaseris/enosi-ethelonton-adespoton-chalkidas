import { createClient } from "next-sanity";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
});

const collections = await client.fetch(
    `*[_type == "photoCollection" && defined(description)]{ _id, description }`
);

const transaction = client.transaction();

collections.forEach((col) => {
    if (Array.isArray(col.description)) return;

    const portableTextBlock = [
        {
            _type: "block",
            _key: Math.random().toString(36).slice(2),
            style: "normal",
            markDefs: [],
            children: [
                {
                    _type: "span",
                    _key: Math.random().toString(36).slice(2),
                    text: col.description,
                    marks: [],
                },
            ],
        },
    ];

    transaction.patch(col._id, { set: { description: portableTextBlock } });
});

await transaction.commit();
console.log(`Migrated ${collections.length} photo collection descriptions.`);