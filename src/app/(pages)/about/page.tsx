import { client } from "@/sanity/lib/client";
import AboutPage from "./AboutPage";
import PageLayout from "@/components/PageLayout";

interface TeamMember {
    _id: string;
    name: string;
    role: string;
    bio: string;
    image?: string;
    order: number;
}

async function getTeamMembers(): Promise<TeamMember[]> {
    const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    "image": image.asset->url,
    order
  }`;

    const teamMembers = await client.fetch(query);
    return teamMembers;
}

export default async function About() {
    const teamMembers = await getTeamMembers();

    return (
        <PageLayout>
            <AboutPage teamMembers={teamMembers} />
        </PageLayout>
    );
}

export const revalidate = 3600; // Revalidate every hour
