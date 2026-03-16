import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/studio/"],
            },
            {
                userAgent: "*",
                allow: "/api/og", // Explicitly allow OG image route
            },
        ],
        sitemap: "https://eeach.gr/sitemap.xml",
    };
}
