import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Ένωση Εθελοντών Αδέσποτων Χαλκίδας",
        short_name: "ΕΕΑΧ",
        description: "Διασώζουμε, φροντίζουμε και βρίσκουμε οικογένειες για αδέσποτα ζώα στη Χαλκίδα",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ec4899",
        icons: [
            {
                src: "/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
