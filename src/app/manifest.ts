import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Paperly",
    short_name: "Paperly",
    description:
      "Create and customize lock screen wallpapers. Preview updates instantly.",
    start_url: "/?source=pwa",
    display: "standalone",
    background_color: "#0B0F1A",
    theme_color: "#0B0F1A",
    orientation: "portrait",
    scope: "/",
    lang: "en",
    // icons: [
    //   {
    //     src: "/icons/icon-192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //   },
    //   {
    //     src: "/icons/icon-512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //   },
    //   {
    //     src: "/icons/icon-192-maskable.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //     purpose: "maskable",
    //   },
    //   {
    //     src: "/icons/icon-512-maskable.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     purpose: "maskable",
    //   },
    // ],
  };
}
