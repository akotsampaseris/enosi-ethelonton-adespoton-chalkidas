import { createClient } from "next-sanity";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: "2024-01-01",
    useCdn: false,
});

const animals = await client.fetch(
    `*[_type == "animal" && defined(description) &&_id=="1f70a6f2-a8a1-4e3e-8f69-4b34f8e821ab"]{ _id, description }`
);

const transaction = client.transaction();

animals.forEach((animal) => {
    if (Array.isArray(animal.description)) return;

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
                    text: animal.description,
                    marks: [],
                },
            ],
        },
    ];

    transaction.patch(animal._id, { set: { description: portableTextBlock } });
});

await transaction.commit();
console.log(`Migrated ${animals.length} animal descriptions.`);