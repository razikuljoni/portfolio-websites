import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "drive.google.com" },
            { protocol: "https", hostname: "**.githubusercontent.com" },
        ],
    },
    async headers() {
        return [
            {
                source: "/images/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/fonts/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
};

// Only initialize Cloudflare when running locally or on Cloudflare
if (process.env.NODE_ENV === "development" || process.env.CLOUDFLARE_ENV === "production") {
    // Dynamic import only when needed
    import("@opennextjs/cloudflare")
        .then((m) => m.initOpenNextCloudflareForDev())
        .catch((err) => {
            console.warn("Failed to initialize OpenNext Cloudflare:", err.message);
        });
}

export default nextConfig;
