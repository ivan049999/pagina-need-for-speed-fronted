import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedCars } from "@/features/cars/components/FeaturedCars";
import { LatestNews } from "@/features/news/components/LatestNews";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCars />
      <LatestNews />
    </>
  );
}
