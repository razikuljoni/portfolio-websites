import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD Razikul Islam Joni — Portfolio",
    short_name: "Razikul Joni",
    description: "Full-stack developer portfolio and résumé.",
    start_url: "/",
    display: "standalone",
    background_color: "#111113",
    theme_color: "#111113",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
