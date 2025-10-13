import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { ImpactSection } from "@/components/home/impact-section";
import { StoriesSection } from "@/components/home/stories-section";
import { GetInvolvedSection } from "@/components/home/get-involved-section";
import { StickyDonateButton } from "@/components/home/sticky-donate-button";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <ImpactSection />
      <StoriesSection />
      <GetInvolvedSection />
      <StickyDonateButton />
    </main>
  );
}