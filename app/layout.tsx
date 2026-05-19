import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luxury Waterfront Rentals | Unforgettable Stays",
    template: "%s | Luxury Waterfront Rentals",
  },
  description:
    "Discover handpicked luxury waterfront rental properties. Enjoy breathtaking views, premium amenities, and unforgettable experiences.",
  keywords: ["vacation rental", "waterfront", "luxury stay", "rental property"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Luxury Waterfront Rentals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
