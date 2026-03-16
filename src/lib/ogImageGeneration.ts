const siteUrl = "https://eeach.gr";

export function generatePageOgImage(title: string, description?: string): string {
    const url = new URL(`${siteUrl}/api/og/page`);
    url.searchParams.set("title", title);

    if (description) {
        url.searchParams.set("description", description);
    }

    return url.toString();
}

export function generateAnimalOgImage(name: string, gender?: string, age?: string, weight?: string, image?: string): string {
    const url = new URL(`${siteUrl}/api/og/animal`);
    url.searchParams.set("name", name);

    if (gender) {
        url.searchParams.set("gender", gender);
    }

    if (age) {
        url.searchParams.set("age", age);
    }

    if (weight) {
        url.searchParams.set("weight", weight);
    }

    if (image) {
        url.searchParams.set("image", image);
    }
    return url.toString();
}

export function generateBlogPostOgImage(title: string, category?: string, image?: string, date?: string): string {
    const url = new URL(`${siteUrl}/api/og/blog`);
    url.searchParams.set("title", title);

    if (category) {
        url.searchParams.set("category", category);
    }

    if (image) {
        url.searchParams.set("image", image);
    }

    if (date) {
        url.searchParams.set("date", date);
    }

    return url.toString();
}
