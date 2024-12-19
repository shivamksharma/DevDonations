import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ImpactSection } from "@/components/home/impact-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <ImpactSection />
    </main>
  );
}