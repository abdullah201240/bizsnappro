import {
  HeroSection,
  StatsSection,
  FeaturesGrid,
  FeatureShowcase,
  CTASection,
} from "@/components/home";
import { MainNav } from "@/components/layout/main-nav";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <FeatureShowcase />
      <CTASection />
      <Footer />
    </div>
  );
}
