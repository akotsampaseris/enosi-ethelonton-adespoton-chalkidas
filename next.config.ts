import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        // remotePatterns: ["images.unsplash.com", "cdn.sanity.io"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
                search: "",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port: "",
                pathname: "/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
