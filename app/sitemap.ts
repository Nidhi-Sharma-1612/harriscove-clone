import type { MetadataRoute } from "next";
import type { Listing } from "@/lib/types";
import { hostawayFetch } from "@/lib/hostaway";

async function getListingIds(): Promise<number[]> {
  try {
    const res = await hostawayFetch("/v1/listings?limit=50&includeResources=1", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const listings: Listing[] = data.result ?? data.results ?? [];
    return listings.map((l) => l.id);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://harriscove.com";
  const ids = await getListingIds();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl,                         lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/properties`,         lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/gallery`,            lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/about`,              lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/contact`,            lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/faqs`,              lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`,    lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/terms`,             lastModified: new Date(), priority: 0.3 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = ids.map((id) => ({
    url: `${baseUrl}/properties/${id}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticRoutes, ...propertyRoutes];
}
