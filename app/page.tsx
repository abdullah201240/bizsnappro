import {
  HeroSection,
  StatsSection,
  FeaturesGrid,
  FeatureShowcase,
  CTASection,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <FeaturesGrid />
      <FeatureShowcase />
      <CTASection />
    </div>
  );
}
