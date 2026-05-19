import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import AmenitiesGrid from "@/components/sections/AmenitiesGrid";
import GalleryPreview from "@/components/sections/GalleryPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AreaAttractions from "@/components/sections/AreaAttractions";
import FaqAccordion from "@/components/sections/FaqAccordion";
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
