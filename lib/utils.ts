import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Hostaway serves images from Airbnb's CDN with aki_policy=x_small by default.
 * Replacing it with "large" gets the full-resolution version.
 */
export function hqImage(url: string | undefined | null): string {
  if (!url) return "";
  return url.replace(/aki_policy=\w+/, "aki_policy=large");
}
