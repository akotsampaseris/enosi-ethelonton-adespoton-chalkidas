import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "w983lvut",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
