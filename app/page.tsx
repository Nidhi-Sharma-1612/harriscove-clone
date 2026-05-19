import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import AmenitiesGrid from "@/components/sections/AmenitiesGrid";
import GalleryPreview from "@/components/sections/GalleryPreview";
import AreaAttractions from "@/components/sections/AreaAttractions";

// Defer JS for below-fold heavy client components — split into separate chunks
// SSR is kept on (default) so content is still indexed by search engines
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
  { loading: () => <div className="py-12 sm:py-16" style={{ background: "var(--navy-gradient)" }} /> }
);

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion"),
  { loading: () => <div className="py-16 sm:py-24 bg-background" /> }
);

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <AmenitiesGrid />
        <GalleryPreview />
        <TestimonialsSection />
        <AreaAttractions />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
